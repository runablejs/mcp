import type { McpServer } from "@modelcontextprotocol/server";

import type { RunableMcpContext } from "../context.js";
import { registerGetProjectTool } from "./get-project.js";
import { registerGetConfigTool } from "./get-config.js";
import { registerGetRoutesTool } from "./get-routes.js";
import { registerGetExtensionsTool } from "./get-extensions.js";
import { registerRefreshTool } from "./refresh.js";

export function registerTools(
  server: McpServer,
  context: RunableMcpContext,
): void {
  registerGetProjectTool(server, context);
  registerGetConfigTool(server, context);
  registerGetRoutesTool(server, context);
  registerGetExtensionsTool(server, context);
  registerRefreshTool(server, context);
}
