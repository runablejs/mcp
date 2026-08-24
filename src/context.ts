import { resolve as resolvePath } from "node:path";

import {
  RunableInspectorUnavailableError,
  RunableProjectError,
} from "./errors.js";
import { withProjectOutputRedirect } from "./project-output-redirect.js";
import { resolveProjectInspectorFactory } from "./runable-resolution.js";
import {
  findMissingInspectorMethod,
  isRunableInspectorLike,
  type RunableInspectorLike,
} from "./runable-inspector.js";

/**
 * The Runable project this MCP server instance was started against — a
 * single, shared Inspector, created once and reused by every tool call.
 */
export interface RunableMcpContext {
  rootDir: string;
  inspector: RunableInspectorLike;
}

export async function createRunableContext(
  rootDir: string,
): Promise<RunableMcpContext> {
  const resolvedRootDir = resolvePath(rootDir);
  const createRunableInspector =
    await resolveProjectInspectorFactory(resolvedRootDir);

  // `createRunableInspector`'s own declared return type already claims
  // `RunableInspectorLike` — but that type is only as trustworthy as the
  // dynamic import that produced the function itself, so the actual value
  // is re-verified below rather than trusted on the type's word alone.
  //
  // This resolves the project's config graph, which executes its
  // runable.config.* file(s) and every module's setup() hook — see
  // project-output-redirect.ts for why that needs to happen with stdout
  // redirected to stderr.
  let inspector: unknown;
  try {
    inspector = await withProjectOutputRedirect(() =>
      createRunableInspector({ rootDir: resolvedRootDir }),
    );
  } catch (error) {
    throw new RunableProjectError(resolvedRootDir, error);
  }

  if (!isRunableInspectorLike(inspector)) {
    const missingMethod = findMissingInspectorMethod(inspector);
    throw new RunableInspectorUnavailableError(
      resolvedRootDir,
      new Error(
        `The installed Runable Inspector is incompatible with this version of @runablejs/mcp. ` +
          `Missing method: ${missingMethod}().`,
      ),
    );
  }

  return { rootDir: resolvedRootDir, inspector };
}
