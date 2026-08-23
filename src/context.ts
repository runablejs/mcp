import { resolve as resolvePath } from "node:path";

import type { RunableInspector } from "runable/inspector";

import { RunableProjectError } from "./errors.js";
import { resolveProjectInspectorFactory } from "./runable-resolution.js";

/**
 * The Runable project this MCP server instance was started against — a
 * single, shared Inspector, created once and reused by every tool call.
 */
export interface RunableMcpContext {
  rootDir: string;
  inspector: RunableInspector;
}

export async function createRunableContext(
  rootDir: string,
): Promise<RunableMcpContext> {
  const resolvedRootDir = resolvePath(rootDir);
  const createRunableInspector =
    await resolveProjectInspectorFactory(resolvedRootDir);

  let inspector: RunableInspector;
  try {
    inspector = await createRunableInspector({ rootDir: resolvedRootDir });
  } catch (error) {
    throw new RunableProjectError(resolvedRootDir, error);
  }

  return { rootDir: resolvedRootDir, inspector };
}
