import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/server";

import type { RunableMcpContext } from "../context.js";
import { DOCS_INDEX, DOCS_INDEX_META } from "../generated/docs-index.js";
import { searchDocs } from "../search/search.js";

const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 20;

export const searchApiInputSchema = z.object({
  query: z
    .string()
    .min(1)
    .describe("Text to search for, e.g. a function name or a short question."),
  limit: z
    .number()
    .int()
    .min(1)
    .max(MAX_LIMIT)
    .optional()
    .describe(
      `Maximum number of results to return (default ${DEFAULT_LIMIT}, max ${MAX_LIMIT}).`,
    ),
});

const resultSchema = z.object({
  title: z.string(),
  path: z
    .string()
    .describe("Full public URL to the matched documentation page."),
  section: z.string().optional(),
  excerpt: z.string(),
  score: z.number(),
});

export const searchApiOutputSchema = z.object({
  query: z.string(),
  documentationVersion: z
    .string()
    .describe("Runable version the embedded documentation describes."),
  projectRunableVersion: z
    .string()
    .optional()
    .describe(
      "Runable version actually installed in the inspected project, if known.",
    ),
  results: z.array(resultSchema),
});

export function registerSearchApiTool(
  server: McpServer,
  context: RunableMcpContext,
): void {
  server.registerTool(
    "search_api",
    {
      title: "Search API",
      description:
        "Search the official Runable documentation and API reference.",
      inputSchema: searchApiInputSchema,
      outputSchema: searchApiOutputSchema,
    },
    async ({ query, limit }) => {
      const results = searchDocs(DOCS_INDEX, query, limit ?? DEFAULT_LIMIT);
      // getProject() only reads the already-resolved project state — no
      // Inspector operation here needs project-output-redirect.ts.
      const project = await context.inspector.getProject();

      const structuredContent = {
        query,
        documentationVersion: DOCS_INDEX_META.runableVersion,
        projectRunableVersion: project.runableVersion,
        results,
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(structuredContent, null, 2),
          },
        ],
        structuredContent,
      };
    },
  );
}
