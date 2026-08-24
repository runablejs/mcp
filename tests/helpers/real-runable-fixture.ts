/**
 * Builds a real, working Runable project on disk, backed by the actual
 * published `runable` package (not a hand-rolled stub) — used by
 * tests/real-inspector.test.ts to prove the schemas and mappings in
 * src/tools/*.ts are faithful to what runable/inspector genuinely returns,
 * not just to what our own fixtures claim it returns.
 *
 * Unlike the rest of the suite (which is fully offline, see
 * tests/helpers/fixture.ts), this specifically requires network access to
 * install `runable` from the npm registry once, memoized across every test
 * in that file. This mirrors `../runable/`'s own published version — see
 * `REAL_RUNABLE_VERSION` below — without this repo depending on
 * `../runable/` existing on disk, so a plain `git clone && pnpm install &&
 * pnpm test` keeps working for contributors without that sibling checkout.
 */

import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

/** Matches the version published from `../runable/packages/runable` at the
 * time this file was written — bump by hand if that package's version
 * changes and its published counterpart follows. */
export const REAL_RUNABLE_VERSION = "1.0.0-alpha.4";

export const REAL_SECRET_VALUE = "do-not-leak-this-value";

let sharedNodeModulesDir: Promise<string> | undefined;

/** Installs the real `runable` package once (memoized for the whole test
 * run) into a throwaway template directory, and returns its `node_modules`
 * — every fixture project symlinks this in rather than reinstalling. */
function ensureRealRunableInstalled(): Promise<string> {
  sharedNodeModulesDir ??= (async () => {
    const templateDir = await mkdtemp(
      join(tmpdir(), "runable-mcp-real-runable-template-"),
    );
    await writeFile(
      join(templateDir, "package.json"),
      JSON.stringify({ name: "real-runable-template", private: true }),
    );
    await execFileAsync(
      "npm",
      ["install", "--no-audit", "--no-fund", `runable@${REAL_RUNABLE_VERSION}`],
      { cwd: templateDir, timeout: 300_000 },
    );
    return join(templateDir, "node_modules");
  })();
  return sharedNodeModulesDir;
}

export interface RealRunableFixture {
  rootDir: string;
  cleanup: () => Promise<void>;
}

/**
 * Creates a real, minimal-but-complete Runable project: a page, a layout, a
 * regular and a global middleware, a plugin, a local module, and a `.env`
 * with one public and one private (`REAL_SECRET_VALUE`) runtime value.
 */
export async function createRealRunableFixture(): Promise<RealRunableFixture> {
  const nodeModulesDir = await ensureRealRunableInstalled();
  const rootDir = await mkdtemp(join(tmpdir(), "runable-mcp-real-fixture-"));
  await symlink(nodeModulesDir, join(rootDir, "node_modules"), "dir");

  await writeFile(
    join(rootDir, "runable.config.mjs"),
    `export default {\n  ssr: true,\n  modules: ["./modules/greet"],\n};\n`,
  );

  await writeFile(
    join(rootDir, ".env"),
    `RUN_PUBLIC_GREETING=hello\nRUN_PRIVATE_TEST_SECRET=${REAL_SECRET_VALUE}\n`,
  );

  await mkdir(join(rootDir, "app/pages"), { recursive: true });
  await writeFile(
    join(rootDir, "app/pages/index.vue"),
    `<template><div>Home</div></template>\n`,
  );

  await mkdir(join(rootDir, "app/layouts"), { recursive: true });
  await writeFile(
    join(rootDir, "app/layouts/default.vue"),
    `<template><slot /></template>\n`,
  );

  await mkdir(join(rootDir, "app/middlewares"), { recursive: true });
  await writeFile(
    join(rootDir, "app/middlewares/auth.ts"),
    `export default function auth() {}\n`,
  );
  await writeFile(
    join(rootDir, "app/middlewares/track.global.ts"),
    `export default function track() {}\n`,
  );

  await mkdir(join(rootDir, "app/plugins"), { recursive: true });
  await writeFile(
    join(rootDir, "app/plugins/hello.ts"),
    `function defineVuePlugin(plugin) {\n  return plugin;\n}\n\n` +
      `export default defineVuePlugin({\n  name: "hello",\n  enforce: "pre",\n  setup(app) {},\n});\n`,
  );

  await mkdir(join(rootDir, "modules/greet"), { recursive: true });
  await writeFile(
    join(rootDir, "modules/greet/runable.config.mjs"),
    "export default {};\n",
  );

  return {
    rootDir,
    cleanup: () => rm(rootDir, { recursive: true, force: true }),
  };
}

/** Adds `app/pages/about.vue` to an existing fixture — used to prove
 * refresh() actually picks up a filesystem change. */
export async function addAboutPage(rootDir: string): Promise<void> {
  await writeFile(
    join(rootDir, "app/pages/about.vue"),
    `<template><div>About</div></template>\n`,
  );
}
