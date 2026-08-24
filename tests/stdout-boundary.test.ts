/**
 * The stdio transport's hard invariant: stdout carries framed JSON-RPC and
 * nothing else, for the whole lifetime of the process — not just during
 * get_config (see project-output-redirect.ts for exactly which Inspector
 * operations this covers and why).
 */

import { Client } from "@modelcontextprotocol/client";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { createFixtureProject } from "./helpers/fixture.js";
import { builtBinPath, ensureBuilt } from "./helpers/build.js";
import { SniffingStdioClientTransport } from "./helpers/sniffing-transport.js";

const execFileAsync = promisify(execFile);
const VALID_PROJECT = {
  rootDir: "/workspace/fixture",
  ssr: true,
  paths: { appDir: "app", generatedDir: ".app", outputDir: ".output" },
};
const VALID_CONFIG = {
  appDir: "app",
  ssr: true,
  head: {},
  runtime: { public: {}, privateKeys: [] },
};

const cleanups: Array<() => Promise<void>> = [];

beforeAll(async () => {
  await ensureBuilt();
});

afterEach(async () => {
  await Promise.all(cleanups.splice(0).map((cleanup) => cleanup()));
});

async function readStderr(
  transport: SniffingStdioClientTransport,
): Promise<{ get: () => string }> {
  let stderr = "";
  transport.stderr?.on("data", (chunk: Buffer) => {
    stderr += chunk.toString("utf8");
  });
  return { get: () => stderr };
}

describe("the stdio boundary between MCP protocol and project output", () => {
  it("--help writes to stdout normally (protection only starts once MCP mode is entered)", async () => {
    const { stdout } = await execFileAsync(process.execPath, [
      builtBinPath,
      "--help",
    ]);
    expect(stdout).toContain("Usage: runable-mcp");
  });

  it("--version writes to stdout normally", async () => {
    const { stdout } = await execFileAsync(process.execPath, [
      builtBinPath,
      "--version",
    ]);
    expect(stdout.trim()).toMatch(/^\d+\.\d+\.\d+/);
  });

  it("redirects a project log during bootstrap (createRunableContext) to stderr, never stdout", async () => {
    const project = await createFixtureProject({
      runable: { project: VALID_PROJECT, logOnCreate: "config-log" },
    });
    cleanups.push(project.cleanup);

    const transport = new SniffingStdioClientTransport(process.execPath, [
      builtBinPath,
      "--cwd",
      project.rootDir,
    ]);
    const client = new Client({ name: "test-client", version: "0.0.0" });

    try {
      await client.connect(transport);
      const stderr = await readStderr(transport);

      // Protocol integrity: the session isn't corrupted by the log.
      const result = await client.callTool({
        name: "get_project",
        arguments: {},
      });
      expect(result.isError).toBeFalsy();

      expect(transport.nonProtocolLines).toEqual([]);
      expect(stderr.get()).toContain("config-log");
    } finally {
      await client.close();
    }
  });

  it("redirects a project log during refresh() to stderr, never stdout", async () => {
    const project = await createFixtureProject({
      runable: {
        project: VALID_PROJECT,
        routes: [],
        logOnRefresh: "refresh-log",
      },
    });
    cleanups.push(project.cleanup);

    const transport = new SniffingStdioClientTransport(process.execPath, [
      builtBinPath,
      "--cwd",
      project.rootDir,
    ]);
    const client = new Client({ name: "test-client", version: "0.0.0" });

    try {
      await client.connect(transport);
      const stderr = await readStderr(transport);

      const refreshResult = await client.callTool({
        name: "refresh",
        arguments: {},
      });
      expect(refreshResult.structuredContent).toEqual({ refreshed: true });

      // Protocol integrity after the redirected call.
      const routesResult = await client.callTool({
        name: "get_routes",
        arguments: {},
      });
      expect(routesResult.isError).toBeFalsy();

      expect(transport.nonProtocolLines).toEqual([]);
      expect(stderr.get()).toContain("refresh-log");
    } finally {
      await client.close();
    }
  });

  it("treats a JSON-looking project log as a log, never as a protocol message", async () => {
    const jsonLookingLog = '{"hello":"world"}';
    const project = await createFixtureProject({
      runable: { project: VALID_PROJECT, logOnCreate: jsonLookingLog },
    });
    cleanups.push(project.cleanup);

    const transport = new SniffingStdioClientTransport(process.execPath, [
      builtBinPath,
      "--cwd",
      project.rootDir,
    ]);
    const client = new Client({ name: "test-client", version: "0.0.0" });

    try {
      await client.connect(transport);
      const stderr = await readStderr(transport);

      const { tools } = await client.listTools();
      expect(tools.map((tool) => tool.name)).toContain("get_project");

      const result = await client.callTool({
        name: "get_project",
        arguments: {},
      });
      expect(result.isError).toBeFalsy();

      expect(transport.nonProtocolLines).toEqual([]);
      expect(stderr.get()).toContain(jsonLookingLog);
    } finally {
      await client.close();
    }
  });

  it("keeps two overlapping redirected calls' protocol responses and logs correctly separated", async () => {
    const project = await createFixtureProject({
      runable: {
        project: VALID_PROJECT,
        routes: [],
        config: VALID_CONFIG,
        logOnRefresh: "refresh-log",
        logOnGetConfig: "get-config-log",
        // Widens the race window: without this, two fast synchronous calls
        // could pass even with a buggy, context-losing implementation.
        logDelayMs: 20,
      },
    });
    cleanups.push(project.cleanup);

    const transport = new SniffingStdioClientTransport(process.execPath, [
      builtBinPath,
      "--cwd",
      project.rootDir,
    ]);
    const client = new Client({ name: "test-client", version: "0.0.0" });

    try {
      await client.connect(transport);
      const stderr = await readStderr(transport);

      // Fired without awaiting between them, on purpose.
      const [refreshResult, configResult] = await Promise.all([
        client.callTool({ name: "refresh", arguments: {} }),
        client.callTool({ name: "get_config", arguments: {} }),
      ]);

      expect(refreshResult.isError).toBeFalsy();
      expect(configResult.isError).toBeFalsy();

      // Both logs made it to stderr, and stdout still carries nothing but
      // the two tool responses — neither call's protocol response was
      // swallowed by the other's redirected logging (see
      // project-output-redirect.ts's doc for the concurrency bug this
      // reproduces and guards against).
      expect(transport.nonProtocolLines).toEqual([]);
      expect(stderr.get()).toContain("refresh-log");
      expect(stderr.get()).toContain("get-config-log");

      const projectResult = await client.callTool({
        name: "get_project",
        arguments: {},
      });
      expect(projectResult.isError).toBeFalsy();
    } finally {
      await client.close();
    }
  });
});
