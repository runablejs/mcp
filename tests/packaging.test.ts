/**
 * Validates the actual publishable artifact — not `src/`, not even `dist/`
 * directly, but a real `pnpm pack` tarball, extracted and wired up exactly
 * the way a package manager would lay it out inside a consumer project's
 * `node_modules`. This is the guard against "works from the repo, breaks
 * after npm publish": wrong `files`, a stripped shebang, a bin resolution
 * that only worked by accident from inside this repo, etc.
 *
 * The tarball's own runtime dependencies (`@modelcontextprotocol/sdk`,
 * `zod`) are symlinked in from this repo's own `node_modules` instead of
 * being fetched from the registry, so this test stays hermetic — it proves
 * the packaging/resolution shape, not npm's own install behavior.
 */

import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  createFixtureProject,
  type FixtureProject,
} from "./helpers/fixture.js";
import { ensureBuilt, repoRoot } from "./helpers/build.js";
import { SniffingStdioClientTransport } from "./helpers/sniffing-transport.js";

const execFileAsync = promisify(execFile);

let extractedPackageDir: string;
let consumerProject: FixtureProject;
let workDir: string;

beforeAll(async () => {
  await ensureBuilt();

  workDir = await mkdtemp(join(tmpdir(), "runable-mcp-packaging-"));

  const { stdout } = await execFileAsync(
    "pnpm",
    ["pack", "--pack-destination", workDir],
    { cwd: repoRoot },
  );
  const tarballPath = stdout.trim().split("\n").pop();
  if (!tarballPath || !existsSync(tarballPath)) {
    throw new Error(
      `\`pnpm pack\` did not produce a tarball (stdout: ${stdout}).`,
    );
  }

  await execFileAsync("tar", ["xf", tarballPath, "-C", workDir]);
  extractedPackageDir = join(workDir, "package");

  const expectedProject = {
    rootDir: "unused",
    runableVersion: "1.0.0-tarball-fixture",
    ssr: true,
    paths: { appDir: "app", generatedDir: ".app", outputDir: ".output" },
  };
  consumerProject = await createFixtureProject({
    runable: { project: expectedProject, version: "1.0.0-tarball-fixture" },
  });

  // Lay out node_modules exactly the way a package manager would: the
  // extracted tarball under its scoped package name, its own runtime deps
  // symlinked in (from this repo's install, to stay offline), and a `.bin`
  // entry pointing at its declared `bin` file.
  const scopeDir = join(consumerProject.rootDir, "node_modules", "@runablejs");
  await mkdir(scopeDir, { recursive: true });
  await symlink(extractedPackageDir, join(scopeDir, "mcp"), "dir");

  const nestedNodeModules = join(scopeDir, "mcp", "node_modules");
  await mkdir(nestedNodeModules, { recursive: true });
  await symlink(
    join(repoRoot, "node_modules", "@modelcontextprotocol"),
    join(nestedNodeModules, "@modelcontextprotocol"),
    "dir",
  );
  await symlink(
    join(repoRoot, "node_modules", "zod"),
    join(nestedNodeModules, "zod"),
    "dir",
  );

  const binDir = join(consumerProject.rootDir, "node_modules", ".bin");
  await mkdir(binDir, { recursive: true });
  await symlink(
    join(extractedPackageDir, "dist", "bin.js"),
    join(binDir, "runable-mcp"),
    "file",
  );
});

afterAll(async () => {
  await consumerProject?.cleanup();
  if (workDir) await rm(workDir, { recursive: true, force: true });
});

describe("the pnpm pack tarball, installed like a real dependency", () => {
  it("includes dist output and type declarations, and ships an executable bin", () => {
    expect(existsSync(join(extractedPackageDir, "dist", "bin.js"))).toBe(true);
    expect(existsSync(join(extractedPackageDir, "dist", "index.js"))).toBe(
      true,
    );
    expect(existsSync(join(extractedPackageDir, "dist", "index.d.ts"))).toBe(
      true,
    );
  });

  it("runs via its installed bin, resolves the consumer project's runable, and answers get_project", async () => {
    const binPath = join(
      consumerProject.rootDir,
      "node_modules",
      ".bin",
      "runable-mcp",
    );

    const transport = new SniffingStdioClientTransport(binPath, [], {
      cwd: consumerProject.rootDir,
    });
    const client = new Client({ name: "test-client", version: "0.0.0" });

    try {
      await client.connect(transport);
      const result = await client.callTool({
        name: "get_project",
        arguments: {},
      });

      expect(result.structuredContent).toMatchObject({
        runableVersion: "1.0.0-tarball-fixture",
        ssr: true,
      });
      expect(transport.nonProtocolLines).toEqual([]);
    } finally {
      await client.close();
    }
  });
});
