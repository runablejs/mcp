# MCP client smoke tests

Last run: 2026-08-25

These checks exercise the built `@runablejs/mcp` server against a temporary,
separate Runable project. They complement the protocol and packaging tests; they
do not replace each client's own release testing.

## Results

| Client           | Version           | Result  | Evidence                                                                                                                                                                  |
| ---------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OpenAI Codex CLI | `0.148.0-alpha.9` | Pass    | Discovered the Runable server and completed `get_project`, `get_routes`, and `search_api`; returned the expected project root, one route, and five documentation results. |
| Claude Code      | `2.1.245`         | Pass    | Loaded a local stdio configuration and reported the Runable server as `Connected`.                                                                                        |
| Cursor Agent     | Not installed     | Not run | Configuration reviewed in `CLIENTS.md`; a real client run still requires Cursor Agent.                                                                                    |
| GitHub Copilot   | Not installed     | Not run | VS Code configuration reviewed in `CLIENTS.md`; a real client run still requires the Copilot extension or CLI.                                                            |

## Test setup

- The project lived outside the MCP repository.
- Its `runable` package resolved from the project's own `node_modules`.
- The MCP server used local `stdio`; no HTTP transport was involved.
- Codex ran ephemerally and was instructed to use only Runable MCP tools.
- Claude Code used a temporary configuration directory and project config, so
  no persistent user MCP settings were changed.

## Remaining manual coverage

Before or shortly after the alpha release, repeat the smoke sequence from
`CLIENTS.md` in Cursor and GitHub Copilot. Record the client version and verify:

1. the server connects without protocol output on stdout;
2. all eight tools are listed;
3. `get_project` points at the intended root;
4. `get_routes` and `search_api` return data;
5. `resolve_route` behaves according to `COMPATIBILITY.md`.
