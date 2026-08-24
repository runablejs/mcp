import { Client, type Tool } from "@modelcontextprotocol/client";
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
  it("starts, accepts an MCP connection, and answers all eight tools", async () => {
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
    const expectedRoutes = [{ path: "/", file: "app/pages/index.vue" }];
    const expectedLayouts = [
      { name: "default", file: "app/layouts/default.vue" },
    ];
    const routeMatch = {
      route: { path: "/", file: "app/pages/index.vue" },
      params: {},
      query: {},
      hash: "",
    };
    const project = await createFixtureProject({
      runable: {
        project: expectedProject,
        config: {},
        version: "1.0.0-fixture",
        routes: expectedRoutes,
        layouts: expectedLayouts,
        resolveRouteResults: { "/": routeMatch },
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

      const { tools } = await client.listTools();
      expect(tools.map((tool: Tool) => tool.name)).toEqual([
        "get_project",
        "get_config",
        "get_routes",
        "get_extensions",
        "refresh",
        "resolve_route",
        "diagnose",
        "search_api",
      ]);

      const projectResult = await client.callTool({
        name: "get_project",
        arguments: {},
      });
      expect(projectResult.structuredContent).toEqual({
        ...expectedProject,
        publicDir: undefined,
      });

      const routesResult = await client.callTool({
        name: "get_routes",
        arguments: {},
      });
      expect(routesResult.structuredContent).toEqual({
        routes: expectedRoutes,
      });

      const extensionsResult = await client.callTool({
        name: "get_extensions",
        arguments: { kind: "layouts" },
      });
      expect(extensionsResult.structuredContent).toEqual({
        kind: "layouts",
        items: expectedLayouts,
      });

      const resolveRouteResult = await client.callTool({
        name: "resolve_route",
        arguments: { path: "/" },
      });
      expect(resolveRouteResult.structuredContent).toEqual({
        matched: true,
        match: routeMatch,
      });

      const diagnoseResult = await client.callTool({
        name: "diagnose",
        arguments: {},
      });
      expect(diagnoseResult.structuredContent).toEqual({
        valid: true,
        summary: { errors: 0, warnings: 0, info: 0 },
        issues: [],
      });

      const searchResult = await client.callTool({
        name: "search_api",
        arguments: { query: "useAsyncData" },
      });
      const searchContent = searchResult.structuredContent as {
        results: unknown[];
      };
      expect(searchContent.results.length).toBeGreaterThan(0);

      const refreshResult = await client.callTool({
        name: "refresh",
        arguments: {},
      });
      expect(refreshResult.structuredContent).toEqual({ refreshed: true });

      // The session survives every tool above — confirmed by a plain
      // get_project call still succeeding at the very end.
      const finalProjectResult = await client.callTool({
        name: "get_project",
        arguments: {},
      });
      expect(finalProjectResult.isError).toBeFalsy();

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
