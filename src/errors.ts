/**
 * Errors raised by @runablejs/mcp itself, as distinct from errors raised by
 * the project-local `runable/inspector` module it resolves and calls into.
 */

function causeMessage(cause: unknown): string {
  return cause instanceof Error ? cause.message : String(cause);
}

export class RunableMcpError extends Error {
  override readonly name: string = "RunableMcpError";
}

/** No `runable` package could be resolved from the inspected project at all. */
export class RunableNotInstalledError extends RunableMcpError {
  override readonly name = "RunableNotInstalledError";

  constructor(rootDir: string, cause?: unknown) {
    super(`No Runable installation found for project "${rootDir}".`, { cause });
  }
}

/** `runable` was resolved, but it does not expose the `runable/inspector` subpath. */
export class RunableInspectorUnavailableError extends RunableMcpError {
  override readonly name = "RunableInspectorUnavailableError";

  constructor(rootDir: string, cause?: unknown) {
    super(
      `The installed Runable version does not expose "runable/inspector" for project "${rootDir}". ` +
        `Upgrade Runable before using @runablejs/mcp.`,
      { cause },
    );
  }
}

/** `createRunableInspector()` itself rejected the project (invalid config, etc). */
export class RunableProjectError extends RunableMcpError {
  override readonly name = "RunableProjectError";

  constructor(rootDir: string, cause: unknown) {
    super(
      `Failed to create the Runable Inspector for project "${rootDir}": ${causeMessage(cause)}`,
      { cause },
    );
  }
}
