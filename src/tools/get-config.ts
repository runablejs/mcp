import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/server";

import type { RunableMcpContext } from "../context.js";
import type { RunableConfigInfo } from "../runable-inspector.js";
import { withStdoutGuard } from "../stdout-guard.js";

// Mirrors `InspectorConfig` from `runable/inspector` — kept in sync with it
// manually since MCP tool output schemas can't be derived from a TS type.
// `assertOutputParity` below is the compile-time trip wire against drift.
//
// This is also the security boundary for get_config (see README's Security
// section): `runtime.privateKeys` deliberately carries only key *names*,
// never values — that filtering happens inside runable/inspector itself,
// and this schema does not add a field that could smuggle a value back in.
export const configOutputSchema = z.object({
  appDir: z.string().describe("Directory containing the application source."),
  ssr: z.boolean().describe("Whether server-side rendering is enabled."),
  baseUrl: z.string().optional().describe("Configured base URL, if any."),
  siteUrl: z.string().optional().describe("Configured site URL, if any."),
  devtools: z
    .boolean()
    .optional()
    .describe("Whether devtools are enabled, if configured."),
  head: z
    .unknown()
    .describe(
      "Default HTML <head> metadata, if it's a plain serializable value.",
    ),
  runtime: z
    .object({
      public: z
        .record(z.string(), z.unknown())
        .describe(
          "Public runtime values — safe to expose, shipped to the client bundle.",
        ),
      privateKeys: z
        .array(z.string())
        .describe(
          "Names only (never values) of the private runtime values this project defines.",
        ),
    })
    .describe(
      "Runtime configuration, split the same way Runable itself splits it.",
    ),
});

/** Compiles only if `RunableConfigInfo` (this package's own contract, see
 * runable-inspector.ts) still satisfies `configOutputSchema`'s inferred
 * shape — a compile-time guard against the two silently drifting apart. */
function assertOutputParity(
  config: RunableConfigInfo,
): z.infer<typeof configOutputSchema> {
  return config;
}

export function registerGetConfigTool(
  server: McpServer,
  context: RunableMcpContext,
): void {
  server.registerTool(
    "get_config",
    {
      title: "Get config",
      description:
        "Get the resolved Runable configuration for the current project.",
      outputSchema: configOutputSchema,
    },
    async () => {
      // See stdout-guard.ts: getConfig() loads the project's .env via
      // Runable's own loadRuntimeEnv(), which — through dotenv, not through
      // any Runable code — writes an informational line straight to
      // stdout, corrupting the MCP session if left unguarded.
      const config = await withStdoutGuard(() => context.inspector.getConfig());
      const structuredContent = assertOutputParity(config);

      return {
        content: [
          { type: "text" as const, text: JSON.stringify(config, null, 2) },
        ],
        structuredContent,
      };
    },
  );
}
