import { Client, type Tool } from "@modelcontextprotocol/client";
import { InMemoryTransport } from "@modelcontextprotocol/server";
import { afterEach, describe, expect, it } from "vitest";

import { createRunableContext } from "../src/context.js";
import { createRunableMcpServer } from "../src/server.js";
import { MCP_SERVER_NAME, MCP_SERVER_VERSION } from "../src/version.js";
import { createFixtureProject } from "./helpers/fixture.js";

const cleanups: Array<() => Promise<void>> = [];

afterEach(async () => {
  await Promise.all(cleanups.splice(0).map((cleanup) => cleanup()));
});

async function connectServerAndClient(rootDir: string) {
  const context = await createRunableContext(rootDir);
  const server = createRunableMcpServer(context);

  const [serverTransport, clientTransport] =
    InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "test-client", version: "0.0.0" });

  await Promise.all([
    server.connect(serverTransport),
    client.connect(clientTransport),
  ]);

  return { client, server };
}

describe("createRunableMcpServer", () => {
  it("advertises itself under the @runablejs/mcp name and version", async () => {
    const project = await createFixtureProject({ runable: { project: {} } });
    cleanups.push(project.cleanup);

    const context = await createRunableContext(project.rootDir);
    const server = createRunableMcpServer(context);

    expect(server.server.getClientVersion()).toBeUndefined();
    expect(MCP_SERVER_NAME).toBe("@runablejs/mcp");
    expect(MCP_SERVER_VERSION).toMatch(/^\d+\.\d+\.\d+/);
  });

  it("registers exactly the five introspection tools", async () => {
    const project = await createFixtureProject({ runable: { project: {} } });
    cleanups.push(project.cleanup);

    const { client } = await connectServerAndClient(project.rootDir);
    const { tools } = await client.listTools();

    expect(tools.map((tool: Tool) => tool.name)).toEqual([
      "get_project",
      "get_config",
      "get_routes",
      "get_extensions",
      "refresh",
    ]);
  });

  it("get_project returns exactly inspector.getProject()'s result", async () => {
    const expectedProject = {
      rootDir: "/workspace/my-project",
      runableVersion: "1.0.0-alpha.4",
      ssr: true,
      paths: {
        appDir: "app",
        generatedDir: ".app",
        outputDir: ".output",
        publicDir: "public",
      },
    };
    const project = await createFixtureProject({
      runable: { project: expectedProject },
    });
    cleanups.push(project.cleanup);

    const { client } = await connectServerAndClient(project.rootDir);
    const result = await client.callTool({
      name: "get_project",
      arguments: {},
    });

    expect(result.structuredContent).toEqual(expectedProject);
    expect(result.isError).toBeFalsy();
  });
});
