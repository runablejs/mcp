# Security

## Trust model

`@runablejs/mcp` is a local, read-only MCP server transported over `stdio`.
It opens no network listener and its tools do not create, edit, or delete project
files.

The server is not a sandbox. Creating or refreshing the Runable Inspector loads
the target project's `runable.config.*` files and executes Runable module
`setup()` hooks. Only use it with projects you trust. The MCP client separately
controls which model receives tool results and whether calls require approval.

## Final security audit

The v0.1 audit covers these boundaries:

- **Secrets:** `get_config` returns public runtime configuration and private key
  names only. The MCP adapter does not read `.env` or `process.env` to enrich
  responses. Tests assert that a real private value never reaches MCP output.
- **Project execution:** configuration and module execution is explicit in the
  documentation. It occurs during startup and `refresh`; `get_config` may load
  environment data through Runable. These operations run with project trust and
  are not presented as sandboxed.
- **Filesystem:** all tools are read-only and delegate inspection to the public
  `runable/inspector` API. The requested project root must exist and be a
  directory before package resolution begins, preventing an invalid path from
  accidentally resolving Runable from an ancestor workspace.
- **Transport:** stdout is reserved for JSON-RPC after MCP mode begins. Output
  produced while trusted project code or environment loading runs is redirected
  to stderr with async-context isolation, including concurrent tool calls.

The relevant regression suites are `get-config`, `real-inspector`, `context`,
`stdout-boundary`, `real-inspector-stdio`, and `stdio`.

## Reporting a vulnerability

Do not include secrets or exploit details in a public issue. Contact the Runable
maintainers privately through the security reporting channel configured on the
project's GitHub repository.
