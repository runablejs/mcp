import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import type { RunableMcpContext } from "./context.js";
import { registerTools } from "./tools/index.js";
import { MCP_SERVER_NAME, MCP_SERVER_VERSION } from "./version.js";

export function createRunableMcpServer(context: RunableMcpContext): McpServer {
  const server = new McpServer({
    name: MCP_SERVER_NAME,
    version: MCP_SERVER_VERSION,
  });

  registerTools(server, context);

  return server;
}
