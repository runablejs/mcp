import type { RunableInspectorLike } from "../runable-inspector.js";
import { withProjectOutputRedirect } from "../project-output-redirect.js";
import type { DiagnosticContext } from "./types.js";

/** Loads every Inspector getter this package's rules need, once, in
 * parallel — so N rules never cost N Inspector round trips. */
export async function buildDiagnosticContext(
  inspector: RunableInspectorLike,
): Promise<DiagnosticContext> {
  const [
    project,
    config,
    routes,
    layouts,
    middlewares,
    plugins,
    modules,
    autoImports,
  ] = await Promise.all([
    inspector.getProject(),
    // getConfig() loads the project's .env — see project-output-redirect.ts.
    withProjectOutputRedirect(() => inspector.getConfig()),
    inspector.getRoutes(),
    inspector.getLayouts(),
    inspector.getMiddlewares(),
    inspector.getPlugins(),
    inspector.getModules(),
    inspector.getAutoImports(),
  ]);

  return {
    project,
    config,
    routes,
    layouts,
    middlewares,
    plugins,
    modules,
    autoImports,
  };
}
