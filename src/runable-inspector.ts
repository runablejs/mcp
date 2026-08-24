/**
 * @runablejs/mcp's own minimal contract for what it needs from a Runable
 * project's Inspector — deliberately NOT the real `RunableInspector` /
 * `InspectorProject` / `InspectorConfig` / ... types from `runable/inspector`.
 *
 * Those real types are resolved dynamically, per-project, at runtime (see
 * runable-resolution.ts) — the target project's own installed Runable
 * version, which has nothing to do with whatever TypeScript environment
 * `@runablejs/mcp` itself is imported into. If this package's own public
 * `.d.ts` imported `runable/inspector` types directly, a consumer's
 * TypeScript build would need to resolve `runable/inspector` from ITS OWN
 * environment just to type-check against `@runablejs/mcp` — even when
 * targeting a completely different project. This file exists to make that
 * impossible: it mirrors, by hand, every Inspector shape this package
 * actually uses, and evolves independently as more of `RunableInspector`'s
 * surface gets used.
 *
 * Every `Runable*Info` type below mirrors the public Inspector types
 * exposed by Runable (`InspectorProject`, `InspectorConfig`, `InspectorRoute`,
 * ... from `runable/inspector`) — kept in sync by hand; see each tool's
 * `assertOutputParity` for the compile-time trip wire against silent drift.
 */

export interface RunableProjectInfo {
  rootDir: string;
  runableVersion: string | undefined;
  ssr: boolean;
  paths: {
    appDir: string;
    generatedDir: string;
    outputDir: string;
    publicDir: string | undefined;
  };
}

export interface RunableConfigInfo {
  appDir: string;
  ssr: boolean;
  baseUrl: string | undefined;
  siteUrl: string | undefined;
  devtools: boolean | undefined;
  head: unknown;
  runtime: {
    public: Record<string, unknown>;
    privateKeys: string[];
  };
}

export interface RunableRouteInfo {
  name?: string;
  path: string;
  file: string;
  parent?: string;
  meta?: {
    layout?: unknown;
    middleware?: string[];
    [key: string]: unknown;
  };
}

export interface RunableLayoutInfo {
  name: string;
  file: string;
}

export interface RunableMiddlewareInfo {
  name: string;
  file: string;
  global: boolean;
}

export interface RunablePluginInfo {
  name?: string;
  file: string;
  enforce?: "pre" | "post";
  dependsOn?: string[];
}

export interface RunableModuleInfo {
  name: string;
  source: string;
  configKey?: string;
  kind: "local" | "package";
}

export interface RunableImportInfo {
  name: string;
  file: string;
  exportName?: string;
}

export interface RunableComponentInfo {
  name: string;
  file: string;
}

export interface RunableAutoImportsInfo {
  components: RunableComponentInfo[];
  composables: RunableImportInfo[];
  globals: RunableImportInfo[];
}

export interface RunableRouteMatchInfo {
  route: RunableRouteInfo;
  params: Record<string, string | string[]>;
  query: Record<string, string | (string | null)[] | null>;
  hash: string;
}

/** The subset of `RunableInspector` this package actually calls today. */
export interface RunableInspectorLike {
  getProject(): Promise<RunableProjectInfo>;
  getConfig(): Promise<RunableConfigInfo>;
  getRoutes(): Promise<RunableRouteInfo[]>;
  getLayouts(): Promise<RunableLayoutInfo[]>;
  getMiddlewares(): Promise<RunableMiddlewareInfo[]>;
  getPlugins(): Promise<RunablePluginInfo[]>;
  getModules(): Promise<RunableModuleInfo[]>;
  getAutoImports(): Promise<RunableAutoImportsInfo>;
  /**
   * Added to Runable's Inspector after the original 8-method contract this
   * package was first built against — deliberately optional here (and left
   * out of `REQUIRED_INSPECTOR_METHODS` below) so an older, still-otherwise-
   * compatible Runable installation isn't refused entirely just because it
   * predates this one method. `resolve_route` (see tools/resolve-route.ts)
   * checks for it at call time and fails only that call, clearly, rather
   * than gating every tool behind it.
   */
  resolveRoute?(path: string): Promise<RunableRouteMatchInfo | null>;
  refresh(): Promise<void>;
}

export type CreateRunableInspector = (options?: {
  rootDir?: string;
}) => Promise<RunableInspectorLike>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isCreateRunableInspector(
  value: unknown,
): value is CreateRunableInspector {
  return typeof value === "function";
}

/** Every method @runablejs/mcp's tools call on a resolved Inspector instance —
 * used both to validate that instance and, on failure, to name exactly which
 * method is missing. */
const REQUIRED_INSPECTOR_METHODS = [
  "getProject",
  "getConfig",
  "getRoutes",
  "getLayouts",
  "getMiddlewares",
  "getPlugins",
  "getModules",
  "getAutoImports",
  "refresh",
] as const satisfies readonly (keyof RunableInspectorLike)[];

/** Returns the name of the first required method missing from `value`, or
 * `undefined` if it satisfies the full `RunableInspectorLike` contract. */
export function findMissingInspectorMethod(value: unknown): string | undefined {
  if (!isRecord(value)) return REQUIRED_INSPECTOR_METHODS[0];
  return REQUIRED_INSPECTOR_METHODS.find(
    (method) => typeof value[method] !== "function",
  );
}

/** Validates the object `createRunableInspector()` actually resolved to —
 * not just the factory function itself — so an incompatible `runable`
 * version fails with a clear error instead of a bare
 * `TypeError: inspector.getRoutes is not a function` the first time a tool
 * calls it. */
export function isRunableInspectorLike(
  value: unknown,
): value is RunableInspectorLike {
  return findMissingInspectorMethod(value) === undefined;
}
