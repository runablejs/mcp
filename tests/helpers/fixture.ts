/**
 * Builds throwaway "Runable project" fixtures on disk for tests — each one
 * with its own fake `runable` package under its own `node_modules`, so
 * tests never depend on `../runable` or a real Runable installation.
 *
 * The fake `runable/inspector` module mimics only the shape
 * `@runablejs/mcp` actually relies on — enough to prove the MCP's own
 * resolution/adaptation logic, not to re-test Runable's own Inspector (see
 * tests/helpers/real-runable-fixture.ts for that).
 */

import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export interface FixtureRunableOptions {
  /** Set to `false` to publish a `runable` package with no `./inspector` export. */
  exposeInspector?: boolean;
  /** Version reported in the fake package's own package.json. */
  version?: string;
  /** The object the fake `getProject()` resolves to. */
  project?: Record<string, unknown>;
  /** The object the fake `getConfig()` resolves to. */
  config?: Record<string, unknown>;
  /** The array the fake `getRoutes()` resolves to before `refresh()` is called. */
  routes?: Record<string, unknown>[];
  /** If set, `getRoutes()` switches to this array once `refresh()` has been
   * called — lets a test prove refresh's effect without a real filesystem. */
  routesAfterRefresh?: Record<string, unknown>[];
  /** The array the fake `getLayouts()` resolves to. */
  layouts?: Record<string, unknown>[];
  /** The array the fake `getMiddlewares()` resolves to. */
  middlewares?: Record<string, unknown>[];
  /** The array the fake `getPlugins()` resolves to. */
  plugins?: Record<string, unknown>[];
  /** The array the fake `getModules()` resolves to. */
  modules?: Record<string, unknown>[];
  /** The object the fake `getAutoImports()` resolves to. */
  autoImports?: Record<string, unknown>;
  /** Maps an input path to the fake `resolveRoute(path)` result (before
   * `refresh()`). A path not present in this map resolves to `null`. */
  resolveRouteResults?: Record<string, Record<string, unknown> | null>;
  /** Same as `resolveRouteResults`, but active once `refresh()` has been
   * called — defaults to `resolveRouteResults` if omitted. */
  resolveRouteResultsAfterRefresh?: Record<
    string,
    Record<string, unknown> | null
  >;
  /** If set, the fake `createRunableInspector()` rejects with this message. */
  rejectWith?: string;
  /** Method names to omit entirely from the resolved Inspector instance — e.g. `["getRoutes"]` to simulate an incompatible/older Inspector missing that one method. */
  omitMethods?: string[];
  /** If set, `console.log`s this exact string synchronously while
   * `createRunableInspector()` runs — stands in for a `runable.config.*`
   * file's or a module's `setup()` hook's own output during config
   * resolution. */
  logOnCreate?: string;
  /** Same as `logOnCreate`, but during `refresh()` instead. */
  logOnRefresh?: string;
  /** Same as `logOnCreate`, but during `getConfig()` instead. */
  logOnGetConfig?: string;
  /** Milliseconds to `await` (via a real timer, not just a microtask) right
   * before each of the above logs — widens the race window for tests that
   * fire two logged operations without awaiting between them, to prove
   * their redirected output doesn't cross-contaminate. */
  logDelayMs?: number;
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

  const rejection = options.rejectWith
    ? `throw new Error(${JSON.stringify(options.rejectWith)});`
    : "";
  const omit = new Set(options.omitMethods ?? []);
  const method = (name: string, body: string, params = ""): string =>
    omit.has(name) ? "" : `async ${name}(${params}) { ${body} },`;

  const project = JSON.stringify(options.project ?? {});
  const config = JSON.stringify(options.config ?? {});
  const routes = JSON.stringify(options.routes ?? []);
  const routesAfterRefresh = JSON.stringify(
    options.routesAfterRefresh ?? options.routes ?? [],
  );
  const layouts = JSON.stringify(options.layouts ?? []);
  const middlewares = JSON.stringify(options.middlewares ?? []);
  const plugins = JSON.stringify(options.plugins ?? []);
  const modules = JSON.stringify(options.modules ?? []);
  const autoImports = JSON.stringify(
    options.autoImports ?? { components: [], composables: [], globals: [] },
  );
  const resolveRouteResultsBeforeRefresh = JSON.stringify(
    options.resolveRouteResults ?? {},
  );
  const resolveRouteResultsAfterRefresh = JSON.stringify(
    options.resolveRouteResultsAfterRefresh ??
      options.resolveRouteResults ??
      {},
  );
  const delayMs = options.logDelayMs ?? 0;
  const delay =
    delayMs > 0 ? `await new Promise((r) => setTimeout(r, ${delayMs}));` : "";
  const log = (message: string | undefined): string =>
    message ? `${delay} console.log(${JSON.stringify(message)});` : "";
  const logOnCreate = log(options.logOnCreate);
  const logOnRefresh = log(options.logOnRefresh);
  const logOnGetConfig = log(options.logOnGetConfig);

  await writeFile(
    join(packageDir, "inspector.js"),
    `export async function createRunableInspector(options) {
  ${logOnCreate}
  ${rejection}
  const project = ${project};
  const config = ${config};
  const routesBeforeRefresh = ${routes};
  const routesAfterRefresh = ${routesAfterRefresh};
  const layouts = ${layouts};
  const middlewares = ${middlewares};
  const plugins = ${plugins};
  const modules = ${modules};
  const autoImports = ${autoImports};
  const resolveRouteResultsBeforeRefresh = ${resolveRouteResultsBeforeRefresh};
  const resolveRouteResultsAfterRefresh = ${resolveRouteResultsAfterRefresh};
  let refreshed = false;

  return {
    ${method("getProject", "return project;")}
    ${method("getConfig", `${logOnGetConfig} return config;`)}
    ${method("getRoutes", "return refreshed ? routesAfterRefresh : routesBeforeRefresh;")}
    ${method("getLayouts", "return layouts;")}
    ${method("getMiddlewares", "return middlewares;")}
    ${method("getPlugins", "return plugins;")}
    ${method("getModules", "return modules;")}
    ${method("getAutoImports", "return autoImports;")}
    ${method(
      "resolveRoute",
      "const table = refreshed ? resolveRouteResultsAfterRefresh : resolveRouteResultsBeforeRefresh; return table[path] ?? null;",
      "path",
    )}
    ${method("refresh", `${logOnRefresh} refreshed = true;`)}
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
