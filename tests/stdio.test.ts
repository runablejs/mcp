import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { afterEach, beforeAll, describe, expect, it } from "vitest";

import { createFixtureProject } from "./helpers/fixture.js";
import { builtBinPath, ensureBuilt } from "./helpers/build.js";
import { SniffingStdioClientTransport } from "./helpers/sniffing-transport.js";

const cleanups: Array<() => Promise<void>> = [];

beforeAll(async () => {
  await ensureBuilt();
});

afterEach(async () => {
  await Promise.all(cleanups.splice(0).map((cleanup) => cleanup()));
});

describe("the packaged CLI over real stdio", () => {
  it("starts, accepts an MCP connection, and answers get_project", async () => {
    const expectedProject = {
      rootDir: "/workspace/my-project",
      runableVersion: "1.0.0-fixture",
      ssr: false,
      paths: {
        appDir: "app",
        generatedDir: ".app",
        outputDir: ".output",
        publicDir: undefined,
      },
    };
    const project = await createFixtureProject({
      runable: { project: expectedProject, version: "1.0.0-fixture" },
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

      const { tools } = await client.listTools();
      expect(tools.map((tool) => tool.name)).toEqual(["get_project"]);

      const result = await client.callTool({
        name: "get_project",
        arguments: {},
      });
      expect(result.structuredContent).toEqual({
        ...expectedProject,
        publicDir: undefined,
      });

      // Nothing but framed JSON-RPC ever reached stdout during the session.
      expect(transport.nonProtocolLines).toEqual([]);
    } finally {
      await client.close();
    }
  });

  it("exits cleanly with a clear stderr message for a project with no Runable installed", async () => {
    const project = await createFixtureProject({ runable: "missing" });
    cleanups.push(project.cleanup);

    const transport = new SniffingStdioClientTransport(process.execPath, [
      builtBinPath,
      "--cwd",
      project.rootDir,
    ]);
    let stderr = "";
    transport.onerror = () => {};

    await transport.start();
    transport.stderr?.on("data", (chunk: Buffer) => {
      stderr += chunk.toString("utf8");
    });

    await new Promise((resolvePromise) => {
      transport.onclose = () => resolvePromise(undefined);
    });

    expect(stderr).toContain("No Runable installation found");
    expect(transport.nonProtocolLines).toEqual([]);
  });
});
