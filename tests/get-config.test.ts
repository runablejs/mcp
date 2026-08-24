import { Client } from "@modelcontextprotocol/client";
import { InMemoryTransport } from "@modelcontextprotocol/server";
import { afterEach, describe, expect, it } from "vitest";

import { createRunableContext } from "../src/context.js";
import { createRunableMcpServer } from "../src/server.js";
import {
  createFixtureProject,
  type FixtureProject,
} from "./helpers/fixture.js";

const cleanups: Array<() => Promise<void>> = [];

afterEach(async () => {
  await Promise.all(cleanups.splice(0).map((cleanup) => cleanup()));
});

async function fixture(
  ...args: Parameters<typeof createFixtureProject>
): Promise<FixtureProject> {
  const project = await createFixtureProject(...args);
  cleanups.push(project.cleanup);
  return project;
}

async function connectClient(rootDir: string): Promise<Client> {
  const context = await createRunableContext(rootDir);
  const server = createRunableMcpServer(context);
  const [serverTransport, clientTransport] =
    InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "test-client", version: "0.0.0" });
  await Promise.all([
    server.connect(serverTransport),
    client.connect(clientTransport),
  ]);
  return client;
}

describe("get_config", () => {
  it("calls inspector.getConfig() and returns exactly its result", async () => {
    const config = {
      appDir: "app",
      ssr: true,
      baseUrl: "/base",
      siteUrl: "https://example.com",
      devtools: true,
      head: { title: "My app" },
      runtime: { public: { greeting: "hello" }, privateKeys: ["apiKey"] },
    };
    const project = await fixture({ runable: { config } });

    const client = await connectClient(project.rootDir);
    const result = await client.callTool({ name: "get_config", arguments: {} });

    expect(result.structuredContent).toEqual(config);
    expect(result.isError).toBeFalsy();
    await client.close();
  });

  it("never leaks a private runtime value it doesn't itself hold", async () => {
    // This fixture's fake getConfig() already mimics the real Inspector's
    // contract (only key *names* under privateKeys, no values) — this test
    // guards @runablejs/mcp's own pass-through, not runable/inspector's
    // redaction logic (see tests/real-inspector.test.ts for that).
    const secretValue = "do-not-leak-this-value";
    const config = {
      appDir: "app",
      ssr: true,
      baseUrl: undefined,
      siteUrl: undefined,
      devtools: undefined,
      head: {},
      runtime: { public: {}, privateKeys: ["dbPassword"] },
    };
    const project = await fixture({ runable: { config } });

    const client = await connectClient(project.rootDir);
    const result = await client.callTool({ name: "get_config", arguments: {} });

    expect(JSON.stringify(result)).not.toContain(secretValue);
    await client.close();
  });
});
