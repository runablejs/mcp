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

describe("resolve_route", () => {
  it("calls inspector.resolveRoute(path) and wraps a match as { matched: true, match }", async () => {
    const match = {
      route: {
        name: "users-id",
        path: "/users/:id",
        file: "app/pages/users/[id].vue",
      },
      params: { id: "42" },
      query: {},
      hash: "",
    };
    const project = await fixture({
      runable: { resolveRouteResults: { "/users/42": match } },
    });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({
      name: "resolve_route",
      arguments: { path: "/users/42" },
    });

    expect(result.structuredContent).toEqual({ matched: true, match });
    expect(result.isError).toBeFalsy();
    await client.close();
  });

  it("wraps a miss as { matched: false, match: null }, without throwing", async () => {
    const project = await fixture({ runable: {} });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({
      name: "resolve_route",
      arguments: { path: "/does-not-exist" },
    });

    expect(result.structuredContent).toEqual({ matched: false, match: null });
    expect(result.isError).toBeFalsy();
    await client.close();
  });

  it("passes optional params through as an empty object, not undefined/null", async () => {
    const match = {
      route: {
        name: "blog-slug",
        path: "/blog/:slug?",
        file: "app/pages/blog/[[slug]].vue",
      },
      params: {},
      query: {},
      hash: "",
    };
    const project = await fixture({
      runable: { resolveRouteResults: { "/blog": match } },
    });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({
      name: "resolve_route",
      arguments: { path: "/blog" },
    });
    expect(result.structuredContent).toMatchObject({
      matched: true,
      match: { params: {} },
    });
    await client.close();
  });

  it("passes a catch-all array param through unchanged", async () => {
    const match = {
      route: {
        name: "docs-path",
        path: "/docs/:path(.*)",
        file: "app/pages/docs/[...path].vue",
      },
      params: { path: "a/b/c" },
      query: {},
      hash: "",
    };
    const project = await fixture({
      runable: { resolveRouteResults: { "/docs/a/b/c": match } },
    });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({
      name: "resolve_route",
      arguments: { path: "/docs/a/b/c" },
    });
    expect(result.structuredContent).toEqual({ matched: true, match });
    await client.close();
  });

  it("passes query and hash through unchanged", async () => {
    const match = {
      route: {
        name: "users-id",
        path: "/users/:id",
        file: "app/pages/users/[id].vue",
      },
      params: { id: "42" },
      query: { tab: "profile" },
      hash: "#bio",
    };
    const project = await fixture({
      runable: { resolveRouteResults: { "/users/42?tab=profile#bio": match } },
    });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({
      name: "resolve_route",
      arguments: { path: "/users/42?tab=profile#bio" },
    });
    expect(result.structuredContent).toEqual({ matched: true, match });
    await client.close();
  });

  it("reflects a route added after refresh(), not before", async () => {
    const before: Record<string, Record<string, unknown> | null> = {};
    const match = {
      route: { name: "about", path: "/about", file: "app/pages/about.vue" },
      params: {},
      query: {},
      hash: "",
    };
    const project = await fixture({
      runable: {
        resolveRouteResults: before,
        resolveRouteResultsAfterRefresh: { "/about": match },
      },
    });
    const client = await connectClient(project.rootDir);

    const stale = await client.callTool({
      name: "resolve_route",
      arguments: { path: "/about" },
    });
    expect(stale.structuredContent).toEqual({ matched: false, match: null });

    await client.callTool({ name: "refresh", arguments: {} });

    const updated = await client.callTool({
      name: "resolve_route",
      arguments: { path: "/about" },
    });
    expect(updated.structuredContent).toEqual({ matched: true, match });

    await client.close();
  });

  it("fails clearly, without affecting other tools, against an Inspector that doesn't implement resolveRoute()", async () => {
    const project = await fixture({
      runable: {
        project: {
          rootDir: "/x",
          runableVersion: "1.0.0-alpha.4",
          ssr: true,
          paths: { appDir: "app", generatedDir: ".app", outputDir: ".output" },
        },
        omitMethods: ["resolveRoute"],
      },
    });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({
      name: "resolve_route",
      arguments: { path: "/" },
    });
    expect(result.isError).toBe(true);
    expect(JSON.stringify(result.content)).toMatch(/resolveRoute/);
    expect(JSON.stringify(result.content)).toMatch(/runable@1\.0\.0-alpha\.4/);

    // The rest of the server keeps working — resolveRoute() is checked
    // per-call, not gated behind at context creation like the other 8
    // required methods.
    const projectResult = await client.callTool({
      name: "get_project",
      arguments: {},
    });
    expect(projectResult.isError).toBeFalsy();

    await client.close();
  });
});
