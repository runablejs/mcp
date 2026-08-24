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

describe("get_routes", () => {
  it("calls inspector.getRoutes() and wraps its result under { routes }", async () => {
    const routes = [
      { name: "index", path: "/", file: "app/pages/index.vue" },
      {
        name: "users-id",
        path: "/users/:id",
        file: "app/pages/users/[id].vue",
        meta: { middleware: ["auth"] },
      },
    ];
    const project = await fixture({ runable: { routes } });

    const client = await connectClient(project.rootDir);
    const result = await client.callTool({ name: "get_routes", arguments: {} });

    expect(result.structuredContent).toEqual({ routes });
    expect(result.isError).toBeFalsy();
    await client.close();
  });

  it("returns an empty routes list as-is, without inventing any", async () => {
    const project = await fixture({ runable: { routes: [] } });

    const client = await connectClient(project.rootDir);
    const result = await client.callTool({ name: "get_routes", arguments: {} });

    expect(result.structuredContent).toEqual({ routes: [] });
    await client.close();
  });
});
