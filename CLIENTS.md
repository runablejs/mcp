# MCP client integrations

`@runablejs/mcp` is a local stdio server. Install it in the Runable project
that will be inspected:

```bash
npm install --save-dev @runablejs/mcp
```

The examples below use absolute paths deliberately. MCP clients don't all
start local servers from the project directory, while `runable mcp` must
resolve the inspected project's own `runable` installation.

Replace both occurrences of `/absolute/path/to/project` before using an
example. On Windows, point `command` at the corresponding
`node_modules\\.bin\\runable.cmd` file. These examples require a Runable CLI
version that includes the `mcp` command; use the direct `runable-mcp` binary
shown in the main README with an older CLI.

## Codex

Codex CLI, the Codex IDE extension, and the ChatGPT desktop app share MCP
configuration. Add this to project-scoped `.codex/config.toml` or the global
`~/.codex/config.toml`:

```toml
[mcp_servers.runable]
command = "/absolute/path/to/project/node_modules/.bin/runable"
args = ["mcp", "--cwd", "/absolute/path/to/project"]
required = true
default_tools_approval_mode = "approve"
```

All Runable tools are read-only, so `approve` avoids repeated approval prompts.
Use `prompt` instead if you want every call confirmed.

Alternatively, register it from the command line:

```bash
codex mcp add runable -- /absolute/path/to/project/node_modules/.bin/runable mcp --cwd /absolute/path/to/project
codex mcp list
```

See the [official Codex MCP documentation](https://developers.openai.com/codex/mcp/).

## Claude Code

Create `.mcp.json` at the Runable project root to share the configuration with
the team:

```json
{
  "mcpServers": {
    "runable": {
      "type": "stdio",
      "command": "/absolute/path/to/project/node_modules/.bin/runable",
      "args": ["mcp", "--cwd", "/absolute/path/to/project"]
    }
  }
}
```

Or register it from the project directory:

```bash
claude mcp add --transport stdio --scope project runable -- /absolute/path/to/project/node_modules/.bin/runable mcp --cwd /absolute/path/to/project
claude mcp get runable
```

Inside Claude Code, use `/mcp` to inspect the connection. See the
[official Claude Code MCP documentation](https://code.claude.com/docs/en/mcp).

## Cursor

Create `.cursor/mcp.json` at the Runable project root:

```json
{
  "mcpServers": {
    "runable": {
      "command": "/absolute/path/to/project/node_modules/.bin/runable",
      "args": ["mcp", "--cwd", "/absolute/path/to/project"]
    }
  }
}
```

Restart or reload Cursor, then enable `runable` and its tools in the MCP
settings. Cursor Agent CLI uses the same configuration; verify it with:

```bash
cursor-agent mcp list
cursor-agent mcp list-tools runable
```

See the [official Cursor MCP documentation](https://docs.cursor.com/context/model-context-protocol).

## GitHub Copilot in VS Code

Create `.vscode/mcp.json` at the Runable project root:

```json
{
  "servers": {
    "runable": {
      "type": "stdio",
      "command": "/absolute/path/to/project/node_modules/.bin/runable",
      "args": ["mcp", "--cwd", "/absolute/path/to/project"]
    }
  }
}
```

Open Copilot Chat in Agent mode and enable the Runable tools from the tool
picker. Organization or enterprise policy may need to allow MCP servers.
See the
[official GitHub Copilot MCP documentation](https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/extend-copilot-chat-with-mcp).

## Smoke test

After connecting any client, verify these calls in order:

1. List tools: the server must expose eight tools.
2. Call `get_project`: its `rootDir` must be the intended project.
3. Call `get_routes`: it must return the project's current routes.
4. Call `search_api` with `useAsyncData`: it must return local documentation.
5. If the installed Runable version supports it, call `resolve_route` with
   `/`. See [COMPATIBILITY.md](./COMPATIBILITY.md) for partial support.

If the server doesn't start, run the configured command directly in a terminal.
Project logs belong on stderr; stdout is reserved for MCP and should not be
interpreted as human-readable terminal output.
