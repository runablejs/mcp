import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import type { RunableMcpContext } from "../context.js";
import { registerGetProjectTool } from "./get-project.js";

export function registerTools(
  server: McpServer,
  context: RunableMcpContext,
): void {
  registerGetProjectTool(server, context);
}
