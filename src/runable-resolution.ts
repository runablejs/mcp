/**
 * Resolves `runable/inspector` from a target project's own dependencies —
 * never from @runablejs/mcp's own installation — so the Inspector used to
 * interpret a project always matches the Runable version that project
 * actually has installed.
 *
 * Uses Node's own package resolution (via a `require` scoped to the
 * project's directory) to find where the project's `runable` package lives,
 * then dynamically `import()`s its `./inspector` entry point. `require`
 * (not `import`) is used only for the resolution step because
 * `require.resolve()` can locate a package's `exports`-mapped file without
 * caring whether that file is ESM or CJS; the file itself is always loaded
 * with a real `import()`.
 */

import { createRequire } from "node:module";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import {
  isCreateRunableInspector,
  type CreateRunableInspector,
} from "./runable-inspector.js";
import {
  RunableInspectorUnavailableError,
  RunableNotInstalledError,
} from "./errors.js";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hasErrorCode(error: unknown, code: string): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === code
  );
}

/**
 * Resolves the `createRunableInspector` factory as exported by the `runable`
 * package installed inside `rootDir` (walking up node_modules from there,
 * exactly like Node itself would for code living in that project).
 */
export async function resolveProjectInspectorFactory(
  rootDir: string,
): Promise<CreateRunableInspector> {
  // `createRequire` only uses this path's directory to seed resolution — it
  // does not need to exist, and nothing is loaded through it as CommonJS.
  const requireFromProject = createRequire(join(rootDir, "package.json"));

  try {
    requireFromProject.resolve("runable");
  } catch (error) {
    throw new RunableNotInstalledError(rootDir, error);
  }

  let inspectorEntry: string;
  try {
    inspectorEntry = requireFromProject.resolve("runable/inspector");
  } catch (error) {
    // Distinguishes "package found but the subpath isn't exported" from
    // other resolution failures only for the sake of a precise cause; both
    // land on the same public error.
    if (
      hasErrorCode(error, "ERR_PACKAGE_PATH_NOT_EXPORTED") ||
      hasErrorCode(error, "MODULE_NOT_FOUND")
    ) {
      throw new RunableInspectorUnavailableError(rootDir, error);
    }
    throw new RunableInspectorUnavailableError(rootDir, error);
  }

  const inspectorModule: unknown = await import(
    pathToFileURL(inspectorEntry).href
  );

  const createRunableInspector = isRecord(inspectorModule)
    ? inspectorModule.createRunableInspector
    : undefined;

  if (!isCreateRunableInspector(createRunableInspector)) {
    throw new RunableInspectorUnavailableError(
      rootDir,
      new Error(
        'The resolved "runable/inspector" module does not export a createRunableInspector() function.',
      ),
    );
  }

  return createRunableInspector;
}
