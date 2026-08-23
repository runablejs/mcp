#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { CliArgumentError, HELP_TEXT, parseCliArgs } from "./cli.js";
import { createRunableContext } from "./context.js";
import { createRunableMcpServer } from "./server.js";
import { MCP_SERVER_VERSION } from "./version.js";

async function main(): Promise<void> {
  let options;
  try {
    options = parseCliArgs(process.argv.slice(2));
  } catch (error) {
    if (error instanceof CliArgumentError) {
      process.stderr.write(`${error.message}\n\n${HELP_TEXT}`);
      process.exitCode = 1;
      return;
    }
    throw error;
  }

  if (options.help) {
    process.stdout.write(HELP_TEXT);
    return;
  }

  if (options.version) {
    process.stdout.write(`${MCP_SERVER_VERSION}\n`);
    return;
  }

  // Everything from here on runs after (or instead of) any stdout write
  // above, and stdout is now reserved for the MCP protocol: no more
  // `console.log` / `process.stdout.write` beyond this point.
  const context = await createRunableContext(options.cwd);
  const server = createRunableMcpServer(context);
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error: unknown) => {
  const message =
    error instanceof Error ? (error.stack ?? error.message) : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
