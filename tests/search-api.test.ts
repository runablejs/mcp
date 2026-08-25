import { Client } from "@modelcontextprotocol/client";
import { InMemoryTransport } from "@modelcontextprotocol/server";
import { afterEach, describe, expect, it } from "vitest";

import { createRunableContext } from "../src/context.js";
import { createRunableMcpServer } from "../src/server.js";
import { searchDocs } from "../src/search/search.js";
import { DOCS_INDEX, DOCS_INDEX_META } from "../src/generated/docs-index.js";
import type { DocsIndexEntry } from "../src/search/types.js";
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

const SYNTHETIC_INDEX: DocsIndexEntry[] = [
  {
    title: "useAsyncData",
    url: "https://example.com/docs/api/composables/use-async-data",
    section: "Load, cache, and hydrate asynchronous data during SSR.",
    excerpt: "Use useAsyncData() to load a resource...",
    content:
      "Use `useAsyncData()` to load a resource required to render a page.",
    category: "api",
  },
  {
    title: "Layouts",
    url: "https://example.com/docs/guide/layouts",
    section: "Wrap pages in a shared shell.",
    excerpt: "A layout wraps a page's rendered output...",
    content:
      "A layout wraps a page's rendered output. Layouts live in app/layouts.",
    category: "guide",
  },
  {
    title: "Middleware",
    url: "https://example.com/docs/guide/middlewares",
    section: "Allow, block, or redirect navigation before displaying a page.",
    excerpt: "Files in app/middlewares/ are Vue Router guards.",
    content:
      "Files in app/middlewares/ are Vue Router guards that run before navigation.",
    category: "guide",
  },
];

describe("searchDocs()", () => {
  it("ranks an exact title match above an incidental content mention", () => {
    const results = searchDocs(SYNTHETIC_INDEX, "useAsyncData", 5);

    expect(results[0]?.title).toBe("useAsyncData");
    expect(results[0]?.score).toBeGreaterThan(0);
  });

  it("finds a conceptual query via content/keyword matching, not just an exact title", () => {
    const results = searchDocs(
      SYNTHETIC_INDEX,
      "how do I create middleware",
      5,
    );

    expect(results.map((r) => r.title)).toContain("Middleware");
  });

  it("returns no results for a query that matches nothing", () => {
    const results = searchDocs(SYNTHETIC_INDEX, "xyzzy-not-a-real-term", 5);
    expect(results).toEqual([]);
  });

  it("respects the limit", () => {
    const results = searchDocs(SYNTHETIC_INDEX, "the", 1);
    expect(results.length).toBeLessThanOrEqual(1);
  });

  it("orders results by descending score", () => {
    const results = searchDocs(SYNTHETIC_INDEX, "layout", 5);
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1]!.score).toBeGreaterThanOrEqual(results[i]!.score);
    }
  });

  it("weights a title match above the same term occurring only in body content", () => {
    const index: DocsIndexEntry[] = [
      {
        title: "Routing",
        url: "https://example.com/routing",
        section: "Routes and navigation",
        excerpt: "Configure application routes.",
        content: "Configure application routes and navigation.",
        category: "guide",
      },
      {
        title: "General concepts",
        url: "https://example.com/general",
        section: "Overview",
        excerpt: "An overview mentioning routing.",
        content: "This longer overview mentions routing among many concepts.",
        category: "guide",
      },
    ];

    expect(searchDocs(index, "routing", 2)[0]?.title).toBe("Routing");
  });

  it("splits camelCase API symbols so natural-language terms can find them", () => {
    const results = searchDocs(SYNTHETIC_INDEX, "async data", 5);

    expect(results[0]?.title).toBe("useAsyncData");
  });

  it("normalizes accents in queries", () => {
    const index: DocsIndexEntry[] = [
      {
        title: "Configuration",
        url: "https://example.com/configuration",
        section: "Metadata",
        excerpt: "Configure page metadata.",
        content: "Configure page metadata.",
        category: "guide",
      },
    ];

    expect(searchDocs(index, "métadata", 1)[0]?.title).toBe("Configuration");
  });
});

describe("the embedded documentation index itself", () => {
  it("is non-empty and carries version metadata", () => {
    expect(DOCS_INDEX.length).toBeGreaterThan(0);
    expect(DOCS_INDEX_META.runableVersion).toMatch(/^\d+\.\d+\.\d+/);
    expect(DOCS_INDEX_META.sourceFileCount).toBeGreaterThan(0);
  });

  it("finds the real useAsyncData API doc for an exact symbol query", () => {
    const results = searchDocs(DOCS_INDEX, "useAsyncData", 5);
    expect(results.some((r) => r.title === "useAsyncData")).toBe(true);
  });

  it("finds the real layouts guide for a conceptual question", () => {
    const results = searchDocs(DOCS_INDEX, "how do layouts work", 5);
    expect(results.length).toBeGreaterThan(0);
  });
});

describe("search_api (MCP tool)", () => {
  it("returns structured results with documentationVersion and projectRunableVersion", async () => {
    const project = await fixture({
      runable: { project: { runableVersion: "9.9.9" }, config: {} },
    });
    const client = await connectClient(project.rootDir);

    const result = await client.callTool({
      name: "search_api",
      arguments: { query: "useAsyncData" },
    });

    expect(result.isError).toBeFalsy();
    const content = result.structuredContent as {
      query: string;
      documentationVersion: string;
      projectRunableVersion: string;
      results: unknown[];
    };
    expect(content.query).toBe("useAsyncData");
    expect(content.documentationVersion).toMatch(/^\d+\.\d+\.\d+/);
    expect(content.projectRunableVersion).toBe("9.9.9");
    expect(content.results.length).toBeGreaterThan(0);
    await client.close();
  });

  it("defaults limit to a small number and caps it at the documented maximum", async () => {
    const project = await fixture({ runable: { project: {}, config: {} } });
    const client = await connectClient(project.rootDir);

    const defaultResult = await client.callTool({
      name: "search_api",
      arguments: { query: "the" },
    });
    const defaultContent = defaultResult.structuredContent as {
      results: unknown[];
    };
    expect(defaultContent.results.length).toBeLessThanOrEqual(5);

    const cappedResult = await client.callTool({
      name: "search_api",
      arguments: { query: "the", limit: 1000 },
    });
    expect(cappedResult.isError).toBe(true);

    await client.close();
  });
});
