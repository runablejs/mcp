import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/server";

import type { RunableMcpContext } from "../context.js";
import { withProjectOutputRedirect } from "../project-output-redirect.js";

export const refreshOutputSchema = z.object({
  refreshed: z.literal(true),
});

export function registerRefreshTool(
  server: McpServer,
  context: RunableMcpContext,
): void {
  server.registerTool(
    "refresh",
    {
      title: "Refresh",
      description:
        "Refresh Runable's inspection state after project files or configuration have changed. " +
        "Does not itself return project data — call get_project / get_config / get_routes / " +
        "get_extensions afterwards to read the refreshed state.",
      outputSchema: refreshOutputSchema,
    },
    async () => {
      // refresh() re-resolves the config graph, which re-executes
      // runable.config.* and every module's setup() hook — see
      // project-output-redirect.ts.
      await withProjectOutputRedirect(() => context.inspector.refresh());
      const structuredContent = { refreshed: true as const };

      return {
        content: [
          { type: "text" as const, text: JSON.stringify(structuredContent) },
        ],
        structuredContent,
      };
    },
  );
}
