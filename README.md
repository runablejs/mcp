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

More tools (`get_config`, `get_routes`, `get_extensions`, `resolve_route`, `diagnose`, ...) will follow once this foundation is validated.

## Security

- **stdio only.** No HTTP server, no network port, no network-facing authentication.
- **Read-only.** No tool creates, modifies, or deletes anything in the inspected project.
- **No direct secret access.** This server never reads `.env` files or `process.env` itself to enrich a response — everything returned comes from `runable/inspector`'s own public, filtered representation. If the Inspector withholds something (e.g. private runtime config values), this server withholds it too.
- **Not a sandbox.** `runable/inspector` resolves a project's configuration by actually executing its `runable.config.*` file and every Runable module's `setup()` hook — this is required for the Inspector to see the same configuration Runable itself would resolve. Only point this server at Runable projects whose code you trust.
