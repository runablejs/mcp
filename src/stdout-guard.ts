/**
 * A narrow defensive boundary against third-party stdout chatter pulled in
 * transitively by `runable/inspector` — specifically, `getConfig()` loads
 * the target project's `.env` via `dotenv` (through Runable's own
 * `loadRuntimeEnv()`), and `dotenv` unconditionally `console.log`s an
 * "injected env (...) from .env" notice unless told to be quiet. Runable
 * calls it with `processEnv: {}` (to avoid mutating the real
 * `process.env`), but that option only redirects *where parsed values are
 * written* — it does not suppress the log, and there is no way for a
 * downstream caller to pass `{ quiet: true }` through to that internal
 * call. See the project report's "Problems discovered in Runable Inspector"
 * for the upstream fix this points to (this file is the workaround, not a
 * substitute for it, and never modifies `../runable/`).
 *
 * During an MCP stdio session, stdout is reserved for framed JSON-RPC
 * messages — one stray line here corrupts the whole session for the
 * client, not just this one call. `withStdoutGuard` doesn't blanket-silence
 * stdout (a concurrent tool call's legitimate response could be writing at
 * the same time); it only ever drops writes that don't look like a
 * complete JSON-RPC frame, so a real protocol message is never at risk of
 * being swallowed by this.
 */

function looksLikeJsonRpcFrame(text: string): boolean {
  const trimmed = text.trim();
  return trimmed.startsWith("{") && trimmed.endsWith("}");
}

export async function withStdoutGuard<T>(fn: () => Promise<T>): Promise<T> {
  const originalWrite = process.stdout.write.bind(process.stdout);

  process.stdout.write = ((chunk: unknown, ...rest: unknown[]): boolean => {
    const text =
      typeof chunk === "string"
        ? chunk
        : Buffer.isBuffer(chunk)
          ? chunk.toString("utf8")
          : undefined;

    if (text !== undefined && !looksLikeJsonRpcFrame(text)) {
      return true;
    }

    return (originalWrite as (...args: unknown[]) => boolean)(chunk, ...rest);
  }) as typeof process.stdout.write;

  try {
    return await fn();
  } finally {
    process.stdout.write = originalWrite;
  }
}
