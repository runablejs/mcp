/**
 * Validates the actual publishable artifact — not `src/`, not even `dist/`
 * directly, but a real `pnpm pack` tarball, extracted and wired up exactly
 * the way a package manager would lay it out inside a consumer project's
 * `node_modules`. This is the guard against "works from the repo, breaks
 * after npm publish": wrong `files`, a stripped shebang, a bin resolution
 * that only worked by accident from inside this repo, etc.
 *
 * The tarball is *extracted* (not symlinked) straight into the consumer's
 * `node_modules/@runablejs/mcp` — a real npm install never symlinks a leaf
 * package, and Node's ESM resolver walks up from a module's *real* path to
 * find node_modules siblings, so a symlink pointing outside any
 * node_modules tree (e.g. a bare temp dir) would silently break resolution
 * of the package's own dependencies. `@modelcontextprotocol/server` and
 * `zod` are symlinked in from this repo's own `node_modules` instead of
 * being fetched from the registry, so this test stays hermetic — it proves
 * the packaging/resolution shape, not npm's own install behavior.
 * `@modelcontextprotocol/server`'s own transitive dependency on
 * `@modelcontextprotocol/core` resolves on its own once Node follows that
 * symlink into pnpm's store, where the real `server` package already sits
 * next to its own private `node_modules`.
 *
 * This also stands in for section 13's "MCP package works without its own
 * Runable installation" requirement: nothing here installs `runable` next
 * to `@runablejs/mcp` — only inside the consumer project it targets via
 * `--cwd`/default cwd, proving "MCP installation" and "Runable project
 * installation" are two independent trees.
 */

import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import {
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  symlink,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

import { Client } from "@modelcontextprotocol/client";
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

  const expectedProject = {
    rootDir: "unused",
    runableVersion: "1.0.0-tarball-fixture",
    ssr: true,
    paths: { appDir: "app", generatedDir: ".app", outputDir: ".output" },
  };
  consumerProject = await createFixtureProject({
    runable: {
      project: expectedProject,
      version: "1.0.0-tarball-fixture",
      routes: [{ path: "/", file: "app/pages/index.vue" }],
      resolveRouteResults: {
        "/": {
          route: { path: "/", file: "app/pages/index.vue" },
          params: {},
          query: {},
          hash: "",
        },
      },
    },
  });

  // Lay out node_modules exactly the way a package manager would: the
  // extracted tarball as a real directory under its scoped package name
  // (not a symlink — see the module doc above), its runtime deps
  // (@modelcontextprotocol/server, zod) reachable next to it, and a `.bin`
  // entry pointing at its declared `bin` file.
  const nodeModulesDir = join(consumerProject.rootDir, "node_modules");
  const mcpScopeDir = join(nodeModulesDir, "@runablejs");
  await mkdir(mcpScopeDir, { recursive: true });
  await execFileAsync("tar", ["xf", tarballPath, "-C", mcpScopeDir]);
  extractedPackageDir = join(mcpScopeDir, "mcp");
  await rename(join(mcpScopeDir, "package"), extractedPackageDir);

  const mcpProtocolScopeDir = join(nodeModulesDir, "@modelcontextprotocol");
  await mkdir(mcpProtocolScopeDir, { recursive: true });
  await symlink(
    join(repoRoot, "node_modules", "@modelcontextprotocol", "server"),
    join(mcpProtocolScopeDir, "server"),
    "dir",
  );
  await symlink(
    join(repoRoot, "node_modules", "zod"),
    join(nodeModulesDir, "zod"),
    "dir",
  );

  const binDir = join(nodeModulesDir, ".bin");
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

  it("does not publish a public .d.ts that imports from runable or runable/inspector", async () => {
    const dts = await readFile(
      join(extractedPackageDir, "dist", "index.d.ts"),
      "utf8",
    );

    expect(dts).not.toMatch(/from\s+["']runable(\/|["'])/);
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

  it("resolve_route, diagnose, and search_api all work from the tarball, with search_api's embedded docs index requiring no ../runable/ access", async () => {
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

      const resolveRouteResult = await client.callTool({
        name: "resolve_route",
        arguments: { path: "/" },
      });
      expect(resolveRouteResult.isError).toBeFalsy();
      expect(resolveRouteResult.structuredContent).toMatchObject({
        matched: true,
      });

      const diagnoseResult = await client.callTool({
        name: "diagnose",
        arguments: {},
      });
      expect(diagnoseResult.isError).toBeFalsy();
      expect(diagnoseResult.structuredContent).toMatchObject({
        valid: true,
      });

      // The tarball's own package directory (extractedPackageDir) has no
      // ../runable/ sibling anywhere near it — the process.cwd() for this
      // child is consumerProject.rootDir, a throwaway tmpdir. A successful,
      // populated result here can only come from the checked-in generated
      // docs index bundled into dist/, not from reading ../runable/ at
      // runtime.
      const searchResult = await client.callTool({
        name: "search_api",
        arguments: { query: "useAsyncData" },
      });
      expect(searchResult.isError).toBeFalsy();
      const searchContent = searchResult.structuredContent as {
        documentationVersion: string;
        projectRunableVersion: string;
        results: unknown[];
      };
      expect(searchContent.documentationVersion).toMatch(/^\d+\.\d+\.\d+/);
      expect(searchContent.projectRunableVersion).toBe("1.0.0-tarball-fixture");
      expect(searchContent.results.length).toBeGreaterThan(0);

      expect(transport.nonProtocolLines).toEqual([]);
    } finally {
      await client.close();
    }
  });
});
