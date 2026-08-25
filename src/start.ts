import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";

import { createRunableContext } from "./context.js";
import { createRunableMcpServer } from "./server.js";

/**
 * Starts the Runable MCP server over stdio for one project and keeps the
 * connection alive until its transport closes.
 *
 * Exposed for integrations such as `runable mcp`; callers must reserve stdout
 * for MCP before invoking it.
 */
export async function runRunableMcpServer(rootDir: string): Promise<void> {
  const context = await createRunableContext(rootDir);
  const server = createRunableMcpServer(context);
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
