/**
 * The stdio transport's one hard invariant: once a Runable MCP server is
 * running, stdout carries framed JSON-RPC messages and nothing else. That
 * invariant is at risk from three Inspector operations that actually run
 * project code — verified directly against Runable's own `runable/inspector`
 * source rather than assumed:
 *
 * - `createRunableInspector()` (via `resolveConfigGraph()`) executes every
 *   `runable.config.*` file in the module graph, including each module's
 *   `setup()` hook.
 * - `refresh()` does the exact same thing again, by design (it's the only
 *   way to see a config/module change made after the Inspector was
 *   created).
 * - `getConfig()` doesn't re-execute project code, but does load the
 *   project's `.env` through Runable's own `loadRuntimeEnv()` — a
 *   dependency of Runable's, not project code, but still something outside
 *   this package's control that can write to stdout (see the project
 *   report for the specific case this caught).
 *
 * Every other Inspector getter (`getProject`, `getRoutes`, `getLayouts`,
 * `getMiddlewares`, `getPlugins`, `getModules`, `getAutoImports`) only
 * reads the config graph these three already resolved — static file
 * parsing, no code execution — so they're deliberately not wrapped here.
 *
 * `withProjectOutputRedirect` runs `operation` with stdout writes
 * redirected to stderr instead (untouched — same chunk, same encoding,
 * same callback). Nothing about *content* is inspected to decide this (a
 * project could legitimately log a line that happens to look like JSON —
 * that's still a project log, not a protocol message, and it still
 * belongs on stderr); the redirect decision is instead scoped to the
 * logical async call chain of `operation` itself, via `AsyncLocalStorage`.
 *
 * That choice — over the simpler "swap `process.stdout.write`, run, swap
 * it back" — is deliberate and was not the first approach tried. A
 * window-based swap looks safe in isolation (bracket exactly the Inspector
 * call, restore immediately after), but it isn't under concurrency: the
 * SDK's `tools/call` handler does further *async* work after a tool's own
 * handler function returns and before it actually calls
 * `transport.send()` (input/output schema validation — see
 * `@modelcontextprotocol/server`'s `setToolRequestHandlers`) . If a second
 * redirected call's window opens during that gap, it silently swallows the
 * first call's real protocol response — reproduced directly: two
 * redirected tool calls fired without awaiting between them, and one
 * call's own `{"result":...}` response ended up captured by the other
 * call's window instead of reaching the client. `AsyncLocalStorage`
 * doesn't have this gap: the redirect decision travels with `operation`'s
 * own async chain specifically, so a write belonging to a *different*,
 * concurrently-settling call is never affected by it, no matter how the
 * two interleave — nothing needs to be serialized, and nothing needs to
 * be restored.
 */

import { AsyncLocalStorage } from "node:async_hooks";

const redirectContext = new AsyncLocalStorage<true>();

let patched = false;

/** Installs the redirecting `process.stdout.write` exactly once, lazily —
 * on the first call to `withProjectOutputRedirect`, not at module load, so
 * a session that never calls `get_config`/`refresh` never touches it. Once
 * installed it stays installed for the process's lifetime: every write it
 * receives independently checks the *current* async context, so leaving it
 * in place is exactly as safe as no operation ever having run. */
function ensurePatched(): void {
  if (patched) return;
  patched = true;

  const originalWrite = process.stdout.write.bind(process.stdout);

  process.stdout.write = ((
    ...args: Parameters<typeof process.stdout.write>
  ): boolean => {
    if (redirectContext.getStore()) {
      return (process.stderr.write as (...forwarded: unknown[]) => boolean)(
        ...args,
      );
    }
    return originalWrite(...args);
  }) as typeof process.stdout.write;
}

export function withProjectOutputRedirect<T>(
  operation: () => Promise<T>,
): Promise<T> {
  ensurePatched();
  return redirectContext.run(true, operation);
}
