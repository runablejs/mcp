import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/server";

import type { RunableMcpContext } from "../context.js";
import type { RunableProjectInfo } from "../runable-inspector.js";

// Mirrors `InspectorProject` from `runable/inspector` — kept in sync with it
// manually since MCP tool output schemas can't be derived from a TS type.
// `assertOutputParity` below is the compile-time trip wire against drift.
export const projectOutputSchema = z.object({
  rootDir: z
    .string()
    .describe("Absolute root directory of the inspected project."),
  runableVersion: z
    .string()
    .optional()
    .describe("Version of the runable package resolved for this project."),
  ssr: z.boolean().describe("Whether server-side rendering is enabled."),
  paths: z
    .object({
      appDir: z
        .string()
        .describe(
          "Directory containing the application source (pages, layouts, ...).",
        ),
      generatedDir: z
        .string()
        .describe(
          "Directory Runable writes generated types/virtual-module output to.",
        ),
      outputDir: z.string().describe("Build output directory."),
      publicDir: z
        .string()
        .optional()
        .describe(
          "Directory of static assets served as-is, omitted when disabled.",
        ),
    })
    .describe("Key project paths, relative to rootDir."),
});

/** Compiles only if `RunableProjectInfo` (this package's own contract, see
 * runable-inspector.ts) still satisfies `projectOutputSchema`'s inferred
 * shape — a compile-time guard against the two silently drifting apart. */
function assertOutputParity(
  project: RunableProjectInfo,
): z.infer<typeof projectOutputSchema> {
  return project;
}

export function registerGetProjectTool(
  server: McpServer,
  context: RunableMcpContext,
): void {
  server.registerTool(
    "get_project",
    {
      title: "Get project",
      description:
        "Get information about the current Runable project, as resolved by Runable itself: " +
        "its root directory, the installed Runable version, whether SSR is enabled, and its key paths.",
      outputSchema: projectOutputSchema,
    },
    async () => {
      const project = await context.inspector.getProject();
      const structuredContent = assertOutputParity(project);

      return {
        content: [
          { type: "text" as const, text: JSON.stringify(project, null, 2) },
        ],
        structuredContent,
      };
    },
  );
}
