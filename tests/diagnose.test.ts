import { Client } from "@modelcontextprotocol/client";
import { InMemoryTransport } from "@modelcontextprotocol/server";
import { afterEach, describe, expect, it } from "vitest";

import { createRunableContext } from "../src/context.js";
import { createRunableMcpServer } from "../src/server.js";
import { runDiagnostics } from "../src/diagnostics/diagnose.js";
import type { DiagnosticContext } from "../src/diagnostics/types.js";
import type {
  RunableConfigInfo,
  RunableProjectInfo,
} from "../src/runable-inspector.js";
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

const EMPTY_CONFIG: RunableConfigInfo = {
  appDir: "app",
  ssr: true,
  baseUrl: undefined,
  siteUrl: undefined,
  devtools: undefined,
  head: {},
  runtime: { public: {}, privateKeys: [] },
};
const EMPTY_PROJECT: RunableProjectInfo = {
  rootDir: "/x",
  runableVersion: "1.0.0",
  ssr: true,
  paths: {
    appDir: "app",
    generatedDir: ".app",
    outputDir: ".output",
    publicDir: undefined,
  },
};

function baseContext(
  overrides: Partial<DiagnosticContext> = {},
): DiagnosticContext {
  return {
    project: EMPTY_PROJECT,
    config: EMPTY_CONFIG,
    routes: [],
    layouts: [],
    middlewares: [],
    plugins: [],
    modules: [],
    autoImports: { components: [], composables: [], globals: [] },
    ...overrides,
  };
}

describe("diagnostic engine (runDiagnostics)", () => {
  it("reports valid: true and zero issues for a healthy project", async () => {
    const result = await runDiagnostics(
      baseContext({
        routes: [{ path: "/", file: "app/pages/index.vue" }],
        layouts: [{ name: "default", file: "app/layouts/default.vue" }],
      }),
    );

    expect(result).toEqual({
      valid: true,
      summary: { errors: 0, warnings: 0, info: 0 },
      issues: [],
    });
  });

  it("flags route-layout-missing when definePageMeta({ layout }) names a nonexistent layout", async () => {
    const result = await runDiagnostics(
      baseContext({
        routes: [
          {
            path: "/about",
            file: "app/pages/about.vue",
            meta: { layout: "marketing" },
          },
        ],
        layouts: [{ name: "default", file: "app/layouts/default.vue" }],
      }),
    );

    expect(result.valid).toBe(false);
    expect(result.summary).toEqual({ errors: 1, warnings: 0, info: 0 });
    expect(result.issues).toEqual([
      {
        code: "route-layout-missing",
        severity: "error",
        message:
          'Route "/about" references layout "marketing", which does not exist.',
        file: "app/pages/about.vue",
        route: "/about",
        suggestion: expect.any(String),
      },
    ]);
  });

  it("does not flag layout: false (explicitly disabled), only unresolved string references", async () => {
    const result = await runDiagnostics(
      baseContext({
        routes: [
          {
            path: "/about",
            file: "app/pages/about.vue",
            meta: { layout: false },
          },
        ],
      }),
    );

    expect(result.issues).toEqual([]);
  });

  it("flags route-middleware-missing for each unresolved middleware name", async () => {
    const result = await runDiagnostics(
      baseContext({
        routes: [
          {
            path: "/admin",
            file: "app/pages/admin.vue",
            meta: { middleware: ["auth", "admin-only"] },
          },
        ],
        middlewares: [
          { name: "auth", file: "app/middlewares/auth.ts", global: false },
        ],
      }),
    );

    expect(result.issues).toEqual([
      {
        code: "route-middleware-missing",
        severity: "error",
        message:
          'Route "/admin" references middleware "admin-only", which does not exist.',
        file: "app/pages/admin.vue",
        route: "/admin",
        suggestion: expect.any(String),
      },
    ]);
  });

  it("flags route-name-duplicate when two routes share a name", async () => {
    const result = await runDiagnostics(
      baseContext({
        routes: [
          {
            name: "detail",
            path: "/users/:id",
            file: "app/pages/users/[id].vue",
          },
          {
            name: "detail",
            path: "/posts/:id",
            file: "app/pages/posts/[id].vue",
          },
        ],
      }),
    );

    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toMatchObject({
      code: "route-name-duplicate",
      severity: "error",
    });
  });

  it("flags route-path-duplicate when two routes resolve to the same path", async () => {
    const result = await runDiagnostics(
      baseContext({
        routes: [
          { path: "/settings", file: "app/pages/settings.vue" },
          { path: "/settings", file: "app/pages/account.vue" },
        ],
      }),
    );

    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toMatchObject({
      code: "route-path-duplicate",
      severity: "error",
      route: "/settings",
    });
  });

  it("flags plugin-dependency-missing when dependsOn names a nonexistent plugin", async () => {
    const result = await runDiagnostics(
      baseContext({
        plugins: [
          {
            name: "analytics",
            file: "app/plugins/analytics.ts",
            dependsOn: ["auth"],
          },
        ],
      }),
    );

    expect(result.issues).toEqual([
      {
        code: "plugin-dependency-missing",
        severity: "error",
        message:
          'Plugin "app/plugins/analytics.ts" declares dependsOn: "auth", but no plugin with that name exists.',
        file: "app/plugins/analytics.ts",
        suggestion: expect.any(String),
      },
    ]);
  });

  it("flags layout-name-duplicate and middleware-name-duplicate as warnings, not errors", async () => {
    const result = await runDiagnostics(
      baseContext({
        layouts: [
          { name: "default", file: "app/layouts/default.vue" },
          { name: "default", file: "modules/blog/layouts/default.vue" },
        ],
        middlewares: [
          { name: "auth", file: "app/middlewares/auth.ts", global: false },
          {
            name: "auth",
            file: "modules/blog/middlewares/auth.ts",
            global: false,
          },
        ],
      }),
    );

    const codes = result.issues.map((issue) => issue.code).sort();
    expect(codes).toEqual([
      "layout-name-duplicate",
      "middleware-name-duplicate",
    ]);
    expect(result.issues.every((issue) => issue.severity === "warning")).toBe(
      true,
    );
    // Warnings alone must not flip `valid` to false.
    expect(result.valid).toBe(true);
    expect(result.summary).toEqual({ errors: 0, warnings: 2, info: 0 });
  });

  it("accumulates multiple issues and computes summary counts correctly", async () => {
    const result = await runDiagnostics(
      baseContext({
        routes: [
          { name: "dup", path: "/a", file: "a.vue" },
          { name: "dup", path: "/b", file: "b.vue" },
        ],
        layouts: [
          { name: "default", file: "l1.vue" },
          { name: "default", file: "l2.vue" },
        ],
      }),
    );

    expect(result.summary).toEqual({ errors: 1, warnings: 1, info: 0 });
    expect(result.valid).toBe(false);
    expect(result.issues).toHaveLength(2);
  });
});

describe("diagnose (MCP tool)", () => {
  it("returns a clean result for a project with no issues", async () => {
    const project = await fixture({
      runable: {
        project: {},
        config: {},
        routes: [{ path: "/", file: "app/pages/index.vue" }],
      },
    });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({ name: "diagnose", arguments: {} });
    expect(result.structuredContent).toEqual({
      valid: true,
      summary: { errors: 0, warnings: 0, info: 0 },
      issues: [],
    });
    expect(result.isError).toBeFalsy();
    await client.close();
  });

  it("surfaces a route-layout-missing issue through the real tool call", async () => {
    const project = await fixture({
      runable: {
        project: {},
        config: {},
        routes: [
          {
            path: "/about",
            file: "app/pages/about.vue",
            meta: { layout: "marketing" },
          },
        ],
      },
    });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({ name: "diagnose", arguments: {} });
    expect(result.structuredContent).toMatchObject({
      valid: false,
      summary: { errors: 1, warnings: 0, info: 0 },
    });
    await client.close();
  });
});
