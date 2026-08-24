/**
 * Runs the real, published `runable` package (not a hand-rolled stub)
 * through @runablejs/mcp end-to-end, proving the tool schemas/mappings in
 * src/tools/*.ts are faithful to what runable/inspector genuinely returns.
 *
 * Requires network access to install `runable` from the npm registry once
 * (memoized, ~30s) — see tests/helpers/real-runable-fixture.ts. Every other
 * file in this suite is fully offline; this is the one exception, by design.
 */

import { Client } from "@modelcontextprotocol/client";
import { InMemoryTransport } from "@modelcontextprotocol/server";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createRunableContext } from "../src/context.js";
import { createRunableMcpServer } from "../src/server.js";
import {
  addAboutPage,
  createRealRunableFixture,
  REAL_SECRET_VALUE,
  type RealRunableFixture,
} from "./helpers/real-runable-fixture.js";

let fixture: RealRunableFixture;
let client: Client;

beforeAll(async () => {
  fixture = await createRealRunableFixture();

  const context = await createRunableContext(fixture.rootDir);
  const server = createRunableMcpServer(context);
  const [serverTransport, clientTransport] =
    InMemoryTransport.createLinkedPair();
  client = new Client({ name: "real-inspector-test", version: "0.0.0" });
  await Promise.all([
    server.connect(serverTransport),
    client.connect(clientTransport),
  ]);
}, 300_000);

afterAll(async () => {
  await client?.close();
  await fixture?.cleanup();
});

describe("against a real, published runable/inspector", () => {
  it("get_project reflects the real fixture", async () => {
    const result = await client.callTool({
      name: "get_project",
      arguments: {},
    });

    expect(result.isError).toBeFalsy();
    expect(result.structuredContent).toMatchObject({
      rootDir: fixture.rootDir,
      ssr: true,
    });
  });

  it("get_config exposes the public value and only the private key name — never the secret value", async () => {
    const result = await client.callTool({ name: "get_config", arguments: {} });

    expect(JSON.stringify(result)).not.toContain(REAL_SECRET_VALUE);
    expect(result.structuredContent).toMatchObject({
      runtime: {
        public: { greeting: "hello" },
        privateKeys: ["privateTestSecret"],
      },
    });
  });

  it("get_routes reflects the real fixture's page", async () => {
    const result = await client.callTool({ name: "get_routes", arguments: {} });

    expect(result.structuredContent).toMatchObject({
      routes: [
        expect.objectContaining({ path: "/", file: "app/pages/index.vue" }),
      ],
    });
  });

  it("get_extensions(layouts) reflects the real fixture's layout", async () => {
    const result = await client.callTool({
      name: "get_extensions",
      arguments: { kind: "layouts" },
    });

    expect(result.structuredContent).toEqual({
      kind: "layouts",
      items: [{ name: "default", file: "app/layouts/default.vue" }],
    });
  });

  it("get_extensions(middlewares) reflects both the regular and the .global. middleware", async () => {
    const result = await client.callTool({
      name: "get_extensions",
      arguments: { kind: "middlewares" },
    });

    expect(result.structuredContent).toEqual({
      kind: "middlewares",
      items: expect.arrayContaining([
        { name: "auth", file: "app/middlewares/auth.ts", global: false },
        {
          name: "track",
          file: "app/middlewares/track.global.ts",
          global: true,
        },
      ]),
    });
  });

  it("get_extensions(plugins) reflects the statically-extracted plugin metadata", async () => {
    const result = await client.callTool({
      name: "get_extensions",
      arguments: { kind: "plugins" },
    });

    expect(result.structuredContent).toEqual({
      kind: "plugins",
      items: [{ name: "hello", file: "app/plugins/hello.ts", enforce: "pre" }],
    });
  });

  it("get_extensions(modules) reflects the local module", async () => {
    const result = await client.callTool({
      name: "get_extensions",
      arguments: { kind: "modules" },
    });

    expect(result.structuredContent).toMatchObject({
      kind: "modules",
      items: [
        expect.objectContaining({
          name: "greet",
          source: "modules/greet/runable.config.mjs",
          kind: "local",
        }),
      ],
    });
  });

  it("get_extensions(auto-imports) returns a single object with components/composables/globals", async () => {
    const result = await client.callTool({
      name: "get_extensions",
      arguments: { kind: "auto-imports" },
    });

    expect(result.structuredContent).toMatchObject({
      kind: "auto-imports",
      items: {
        components: expect.any(Array),
        composables: expect.any(Array),
        globals: expect.any(Array),
      },
    });
  });

  // REAL_RUNABLE_VERSION (currently 1.0.0-alpha.4, the latest published to
  // npm) predates resolveRoute() being added to Runable's Inspector — it
  // exists in ../runable/'s own source but has never been published. Until
  // a Runable version that implements it is published and this pin is
  // bumped, resolve_route's real-Inspector behavior is necessarily the
  // graceful-degradation path (see runable-inspector.ts's optional
  // `resolveRoute?`) rather than a genuine match — which this test proves
  // works correctly against a real, unmodified incompatible Inspector. Once
  // a compatible version is published, this assertion should flip to
  // expecting a real match instead.
  it("resolve_route degrades gracefully against the currently published runable, which doesn't implement resolveRoute() yet", async () => {
    const result = await client.callTool({
      name: "resolve_route",
      arguments: { path: "/" },
    });

    expect(result.isError).toBe(true);
    expect(JSON.stringify(result.content)).toMatch(/resolveRoute/);
  });

  it("diagnose reports valid: true for the real fixture's well-formed project", async () => {
    const result = await client.callTool({ name: "diagnose", arguments: {} });

    expect(result.isError).toBeFalsy();
    expect(result.structuredContent).toMatchObject({
      valid: true,
      summary: { errors: 0 },
    });
  });

  it("agent workflow: get_routes -> add a page -> refresh -> get_routes reflects it", async () => {
    const before = await client.callTool({ name: "get_routes", arguments: {} });
    const beforePaths = (
      before.structuredContent as { routes: { path: string }[] }
    ).routes.map((route) => route.path);
    expect(beforePaths).not.toContain("/about");

    await addAboutPage(fixture.rootDir);

    // Runable's own contract: reads never implicitly refresh — the stale
    // result is still returned until refresh() is called explicitly.
    const stillStale = await client.callTool({
      name: "get_routes",
      arguments: {},
    });
    const stalePaths = (
      stillStale.structuredContent as { routes: { path: string }[] }
    ).routes.map((route) => route.path);
    expect(stalePaths).not.toContain("/about");

    const refreshResult = await client.callTool({
      name: "refresh",
      arguments: {},
    });
    expect(refreshResult.structuredContent).toEqual({ refreshed: true });

    const after = await client.callTool({ name: "get_routes", arguments: {} });
    expect(after.structuredContent).toMatchObject({
      routes: expect.arrayContaining([
        expect.objectContaining({
          path: "/about",
          file: "app/pages/about.vue",
        }),
      ]),
    });
  });
});
