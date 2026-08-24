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

const layouts = [{ name: "default", file: "app/layouts/default.vue" }];
const middlewares = [
  { name: "auth", file: "app/middlewares/auth.ts", global: false },
  { name: "track", file: "app/middlewares/track.global.ts", global: true },
];
const plugins = [
  { name: "hello", file: "app/plugins/hello.ts", enforce: "pre" },
];
const modules = [
  {
    name: "greet",
    source: "modules/greet/runable.config.mjs",
    kind: "local",
    configKey: "greet",
  },
];
const autoImports = {
  components: [{ name: "ClientOnly", file: "app/components/client-only.vue" }],
  composables: [{ name: "useRuntime", file: "app/composables/useRuntime.ts" }],
  globals: [{ name: "definePageMeta", file: "app/globals/definePageMeta.ts" }],
};

describe("get_extensions", () => {
  it("kind=layouts calls inspector.getLayouts()", async () => {
    const project = await fixture({
      runable: { layouts, middlewares: [], plugins: [], modules: [] },
    });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({
      name: "get_extensions",
      arguments: { kind: "layouts" },
    });

    expect(result.structuredContent).toEqual({
      kind: "layouts",
      items: layouts,
    });
    await client.close();
  });

  it("kind=middlewares calls inspector.getMiddlewares()", async () => {
    const project = await fixture({ runable: { middlewares } });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({
      name: "get_extensions",
      arguments: { kind: "middlewares" },
    });

    expect(result.structuredContent).toEqual({
      kind: "middlewares",
      items: middlewares,
    });
    await client.close();
  });

  it("kind=plugins calls inspector.getPlugins()", async () => {
    const project = await fixture({ runable: { plugins } });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({
      name: "get_extensions",
      arguments: { kind: "plugins" },
    });

    expect(result.structuredContent).toEqual({
      kind: "plugins",
      items: plugins,
    });
    await client.close();
  });

  it("kind=modules calls inspector.getModules()", async () => {
    const project = await fixture({ runable: { modules } });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({
      name: "get_extensions",
      arguments: { kind: "modules" },
    });

    expect(result.structuredContent).toEqual({
      kind: "modules",
      items: modules,
    });
    await client.close();
  });

  it("kind=auto-imports calls inspector.getAutoImports() (a single object, not an array)", async () => {
    const project = await fixture({ runable: { autoImports } });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({
      name: "get_extensions",
      arguments: { kind: "auto-imports" },
    });

    expect(result.structuredContent).toEqual({
      kind: "auto-imports",
      items: autoImports,
    });
    await client.close();
  });

  it("rejects an invalid kind before ever calling the Inspector", async () => {
    const project = await fixture({ runable: {} });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({
      name: "get_extensions",
      arguments: { kind: "bogus" },
    });

    expect(result.isError).toBe(true);

    await client.close();
  });
});
