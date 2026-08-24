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

describe("refresh", () => {
  it("calls inspector.refresh() and returns { refreshed: true }", async () => {
    const project = await fixture({ runable: {} });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({ name: "refresh", arguments: {} });

    expect(result.structuredContent).toEqual({ refreshed: true });
    expect(result.isError).toBeFalsy();
    await client.close();
  });

  it("is the only thing that changes what get_routes sees — reads never refresh implicitly", async () => {
    const before = [{ path: "/", file: "app/pages/index.vue" }];
    const after = [
      { path: "/", file: "app/pages/index.vue" },
      { path: "/about", file: "app/pages/about.vue" },
    ];
    const project = await fixture({
      runable: { routes: before, routesAfterRefresh: after },
    });
    const client = await connectClient(project.rootDir);

    // 1. Read the routes before any change.
    const initial = await client.callTool({
      name: "get_routes",
      arguments: {},
    });
    expect(initial.structuredContent).toEqual({ routes: before });

    // 2. The fixture's underlying data has already "changed" (simulating a
    // filesystem edit) — but get_routes must NOT reflect it on its own.
    const stillStale = await client.callTool({
      name: "get_routes",
      arguments: {},
    });
    expect(stillStale.structuredContent).toEqual({ routes: before });

    // 3. Only an explicit refresh call updates the Inspector's state.
    const refreshResult = await client.callTool({
      name: "refresh",
      arguments: {},
    });
    expect(refreshResult.structuredContent).toEqual({ refreshed: true });

    // 4. Now get_routes reflects the change.
    const updated = await client.callTool({
      name: "get_routes",
      arguments: {},
    });
    expect(updated.structuredContent).toEqual({ routes: after });

    await client.close();
  });
});
