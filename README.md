# @runablejs/mcp

Official Model Context Protocol server for [Runable](https://github.com/runablejs/runable) projects.

This server does not understand Runable projects itself — `runable/inspector` does. `@runablejs/mcp` is a thin adapter between the MCP protocol and that public, read-only inspection API:

```text
AI coding agent
Claude / Codex / Cursor / ...
             │
             │ MCP (stdio)
             ▼
      @runablejs/mcp
             │
             │ public TypeScript API
             ▼
      runable/inspector
             │
             ▼
       Runable project
```

Because the Inspector is resolved from the **inspected project's own `node_modules`** — never bundled into this package — `@runablejs/mcp` always reflects the exact Runable version that project has installed.

## Installation

```bash
npm install --save-dev @runablejs/mcp
```

`runable` itself is not a dependency of this package — it must already be installed in the project you point `@runablejs/mcp` at.

## Usage

Run it from inside a Runable project:

```bash
runable-mcp
```

Or point it at a project elsewhere on disk:

```bash
runable-mcp --cwd /path/to/project
```

```text
Usage: runable-mcp [options]

Options:
  --cwd <path>   Root directory of the Runable project to inspect (default: current directory)
  -h, --help     Print this help message
  -v, --version  Print the version number
```

The server speaks MCP over stdio only — it is meant to be launched as a child process by an MCP-capable AI coding agent (Claude Code, Codex, Cursor, ...), not run as a standalone network service.

## Current tools

### `get_project`

Returns information about the current Runable project exactly as `runable/inspector`'s `getProject()` resolves it: root directory, the installed Runable version, whether SSR is enabled, and key project paths.

### `get_config`

Returns the resolved Runable configuration exactly as `runable/inspector`'s `getConfig()` resolves it: app directory, SSR, base/site URL, devtools, head metadata, and runtime config. Private runtime values are never included — only the _names_ of the private keys the project defines, never their values (see Security below).

### `get_routes`

Returns the routes currently resolved by Runable, exactly as `runable/inspector`'s `getRoutes()` resolves them, wrapped as `{ routes: [...] }`.

### `get_extensions`

Returns one resolved extension list, selected via a required `kind` input:

- `layouts`
- `middlewares`
- `plugins`
- `modules`
- `auto-imports`

The response is `{ kind, items }`, where `items` is exactly what the matching `runable/inspector` getter (`getLayouts()`, `getMiddlewares()`, `getPlugins()`, `getModules()`, or `getAutoImports()`) returns for that `kind`.

### `refresh`

Refreshes Runable's inspection state after project files or configuration have changed, by calling `runable/inspector`'s own `refresh()`. It does not itself return project data — the other tools never refresh implicitly, so after changing project files, call `refresh` before querying `get_project` / `get_config` / `get_routes` / `get_extensions` again to see the update.

### `resolve_route`

Resolves a URL path against the project's routes exactly as `runable/inspector`'s `resolveRoute()` does — the same Vue Router matching Runable itself uses, so params, optional segments, and catch-alls all behave identically. Takes `{ path }`, returns `{ matched, match }`, where `match` is `null` on a miss.

```json
// Request
{ "path": "/users/42" }

// Response
{
  "matched": true,
  "match": {
    "route": { "name": "users-id", "path": "/users/:id", "file": "app/pages/users/[id].vue" },
    "params": { "id": "42" },
    "query": {},
    "hash": ""
  }
}
```

Requires a Runable version whose Inspector implements `resolveRoute()`; against an older installation, the call fails with a clear upgrade message instead of taking down the rest of the server.

### `diagnose`

Runs a small set of deterministic, structural checks over the project's already-resolved Inspector state — duplicate route names/paths, routes referencing a nonexistent layout or middleware, plugins declaring a missing dependency, and duplicate layout/middleware names. No opinion-based or fuzzy checks (e.g. "too many plugins"): every issue is a concrete, unambiguous problem. Returns `{ valid, summary, issues }`, where `valid` is `false` only when at least one `error`-severity issue was found.

```json
// Response
{
  "valid": false,
  "summary": { "errors": 1, "warnings": 0, "info": 0 },
  "issues": [
    {
      "code": "route-layout-missing",
      "severity": "error",
      "message": "Route \"/about\" references layout \"marketing\", which does not exist.",
      "file": "app/pages/about.vue",
      "route": "/about",
      "suggestion": "Create app/layouts/marketing.vue, or remove the layout reference."
    }
  ]
}
```

### `search_api`

Full-text search over Runable's official documentation, entirely local and offline — no network call, no embeddings, no vector database. The searchable index is generated at build time from Runable's own docs and shipped inside this package, so it works even when the inspected project's `node_modules` has nothing to do with where that documentation lives. Takes `{ query, limit? }` (`limit` defaults to 5, max 20) and returns `{ query, documentationVersion, projectRunableVersion, results }`, where `documentationVersion` is the Runable version the embedded docs describe and `projectRunableVersion` is the version actually installed in the inspected project.

```json
// Request
{ "query": "useAsyncData" }

// Response
{
  "query": "useAsyncData",
  "documentationVersion": "1.0.0-alpha.3",
  "projectRunableVersion": "1.0.0-alpha.4",
  "results": [
    {
      "title": "useAsyncData",
      "path": "https://runablejs.org/docs/api/composables/use-async-data",
      "section": "Usage",
      "excerpt": "useAsyncData wraps an async function and exposes...",
      "score": 156
    }
  ]
}
```

## Security

- **stdio only.** No HTTP server, no network port, no network-facing authentication.
- **Read-only.** No tool creates, modifies, or deletes anything in the inspected project.
- **No direct secret access.** This server never reads `.env` files or `process.env` itself to enrich a response — everything returned comes from `runable/inspector`'s own public, filtered representation. If the Inspector withholds something (e.g. private runtime config values), this server withholds it too.
- **`refresh` is not a mutation.** It only re-resolves `runable/inspector`'s own in-memory state (so later reads reflect files/config changed since the server started) — it never writes to the project, runs a build, or starts a dev server.
- **`diagnose` never scans the filesystem or config files directly.** It only reads Inspector getters that every other tool already reads (`getProject`, `getConfig`, `getRoutes`, ...) — no new access surface.
- **`search_api` is fully offline.** It searches a documentation index generated at build time and shipped inside this package — no network request, no filesystem access outside this package's own files, regardless of what project it's pointed at.
- **Not a sandbox.** `runable/inspector` resolves a project's configuration by actually executing its `runable.config.*` file and every Runable module's `setup()` hook — this is required for the Inspector to see the same configuration Runable itself would resolve. Only point this server at Runable projects whose code you trust.

## Future work

- MCP Resources: evaluate whether project state (routes, config, ...) should also be exposed as MCP resources, not just tool calls.
- MCP Prompts: evaluate whether reusable prompt templates (e.g. "diagnose and fix") belong in this server.
- A documented Runable/`@runablejs/mcp` compatibility policy (which Runable versions each MCP release supports, and how incompatibilities are surfaced).
- Client integrations: documented setup for Claude Code, Codex, Cursor, and other MCP-capable agents.
- CLI integration: a `runable mcp` subcommand in Runable's own CLI, instead of a separate `runable-mcp` binary.
- Official documentation on runablejs.org.
- A final security and packaging audit before a stable release.
- An alpha release.
- Dogfooding this server on real Runable projects before widening adoption.
