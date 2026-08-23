/**
 * Builds throwaway "Runable project" fixtures on disk for tests — each one
 * with its own fake `runable` package under its own `node_modules`, so
 * tests never depend on `../runable` or a real Runable installation.
 *
 * The fake `runable/inspector` module mimics only the shape
 * `@runablejs/mcp` actually relies on (`createRunableInspector()` returning
 * an object with a `getProject()` method) — enough to prove the MCP's own
 * resolution/adaptation logic, not to re-test Runable's own Inspector.
 */

import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export interface FixtureProjectInfo {
  rootDir: string;
  [key: string]: unknown;
}

export interface FixtureRunableOptions {
  /** Set to `false` to publish a `runable` package with no `./inspector` export. */
  exposeInspector?: boolean;
  /** Version reported in the fake package's own package.json. */
  version?: string;
  /** The object the fake `getProject()` resolves to. */
  project?: Record<string, unknown>;
  /** If set, the fake `createRunableInspector()` rejects with this message. */
  rejectWith?: string;
}

export interface FixtureProjectOptions {
  /** `"missing"` omits `node_modules/runable` entirely. */
  runable?: FixtureRunableOptions | "missing";
  /** Set to `false` to omit `runable.config.mjs` from the fixture. */
  hasConfigFile?: boolean;
}

export interface FixtureProject {
  rootDir: string;
  cleanup: () => Promise<void>;
}

async function writeFixtureRunablePackage(
  nodeModulesDir: string,
  options: FixtureRunableOptions,
): Promise<void> {
  const packageDir = join(nodeModulesDir, "runable");
  await mkdir(packageDir, { recursive: true });

  const exposeInspector = options.exposeInspector ?? true;
  const exportsField: Record<string, string> = { ".": "./index.js" };
  if (exposeInspector) {
    exportsField["./inspector"] = "./inspector.js";
  }

  await writeFile(
    join(packageDir, "package.json"),
    JSON.stringify(
      {
        name: "runable",
        version: options.version ?? "0.0.0-fixture",
        type: "module",
        exports: exportsField,
      },
      null,
      2,
    ),
  );
  await writeFile(join(packageDir, "index.js"), "export default {};\n");

  if (!exposeInspector) return;

  const project = JSON.stringify(options.project ?? {});
  const rejection = options.rejectWith
    ? `throw new Error(${JSON.stringify(options.rejectWith)});`
    : "";

  await writeFile(
    join(packageDir, "inspector.js"),
    `export async function createRunableInspector(options) {
  ${rejection}
  const project = ${project};
  return {
    async getProject() { return project; },
    async getConfig() { throw new Error("not implemented in fixture"); },
    async getRoutes() { throw new Error("not implemented in fixture"); },
    async getLayouts() { throw new Error("not implemented in fixture"); },
    async getMiddlewares() { throw new Error("not implemented in fixture"); },
    async getPlugins() { throw new Error("not implemented in fixture"); },
    async getModules() { throw new Error("not implemented in fixture"); },
    async getAutoImports() { throw new Error("not implemented in fixture"); },
    async refresh() {},
  };
}
`,
  );
}

export async function createFixtureProject(
  options: FixtureProjectOptions = {},
): Promise<FixtureProject> {
  const rootDir = await mkdtemp(join(tmpdir(), "runable-mcp-fixture-"));

  if (options.hasConfigFile !== false) {
    await writeFile(
      join(rootDir, "runable.config.mjs"),
      "export default {};\n",
    );
  }

  if (options.runable !== "missing") {
    await writeFixtureRunablePackage(
      join(rootDir, "node_modules"),
      options.runable ?? {},
    );
  }

  return {
    rootDir,
    cleanup: () => rm(rootDir, { recursive: true, force: true }),
  };
}
