# Runable compatibility

`@runablejs/mcp` resolves `runable/inspector` from the inspected project's
own `node_modules`. Compatibility therefore depends on that installed Runable
version, not on where the MCP package itself is installed.

## Compatibility levels

- **Base compatibility** means the server starts and every tool except
  `resolve_route` is available.
- **Full compatibility** means every tool, including `resolve_route`, is
  available.

| `@runablejs/mcp` | Installed `runable`                                | Level       | Notes                                                 |
| ---------------- | -------------------------------------------------- | ----------- | ----------------------------------------------------- |
| `0.1.x`          | `1.0.0-alpha.3` and earlier                        | Unsupported | `runable/inspector` is not exported.                  |
| `0.1.x`          | `1.0.0-alpha.4`                                    | Base        | Inspector core is available; `resolveRoute()` is not. |
| `0.1.x`          | Next release containing `Inspector.resolveRoute()` | Full        | Exact version will replace this row once published.   |

Because Runable is currently in prerelease, compatibility is listed per
published version rather than inferred from a broad semver range.

## Runtime capability checks

The version table documents tested releases, but the server does not trust a
version string on its own. At startup it verifies the Inspector factory and
the methods required by the core tool set:

- `getProject`
- `getConfig`
- `getRoutes`
- `getLayouts`
- `getMiddlewares`
- `getPlugins`
- `getModules`
- `getAutoImports`
- `refresh`

If one is absent, startup fails with the missing method named explicitly.
`resolveRoute` is checked only when `resolve_route` is called, so an
`alpha.4` project retains every other tool.

## Versioning policy

- New optional Inspector capabilities may be exposed without dropping base
  compatibility with an otherwise valid Inspector.
- A newly required Inspector method or output shape will require a new MCP
  minor version while `@runablejs/mcp` is `0.x` and a compatibility-table
  update in the same change.
- Every supported Runable release must be exercised by the real-Inspector
  integration suite before being added to the table.
- Unsupported or untested prereleases are not assumed compatible merely
  because their version is numerically newer.

Both packages currently require Node.js `^22.18.0 || >=24.12.0`.
