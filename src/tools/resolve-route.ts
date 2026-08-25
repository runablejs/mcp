import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/server";

import type { RunableMcpContext } from "../context.js";
import { RunableInspectorUnavailableError } from "../errors.js";
import type { RunableRouteMatchInfo } from "../runable-inspector.js";
import { routeSchema } from "./get-routes.js";

// Mirrors `InspectorRouteMatch` from `runable/inspector` — kept in sync by
// hand; `assertOutputParity` below is the compile-time trip wire.
const matchSchema = z.object({
  route: routeSchema,
  params: z
    .record(z.string(), z.union([z.string(), z.array(z.string())]))
    .describe("Params extracted from the matched path."),
  query: z
    .record(
      z.string(),
      z.union([z.string(), z.array(z.string().nullable()), z.null()]),
    )
    .describe("Parsed query string."),
  hash: z
    .string()
    .describe("Fragment identifier, including the leading #, or empty."),
});

export const resolveRouteInputSchema = z.object({
  path: z.string().describe("Absolute URL path to resolve, e.g. /users/42."),
});

export const resolveRouteOutputSchema = z.object({
  matched: z.boolean(),
  match: matchSchema.nullable(),
});

/** Compiles only if `RunableRouteMatchInfo` (this package's own contract,
 * see runable-inspector.ts) still satisfies `matchSchema`'s inferred shape —
 * a compile-time guard against the two silently drifting apart. */
function assertOutputParity(
  match: RunableRouteMatchInfo,
): z.infer<typeof matchSchema> {
  return match;
}

export function registerResolveRouteTool(
  server: McpServer,
  context: RunableMcpContext,
): void {
  server.registerTool(
    "resolve_route",
    {
      title: "Resolve route",
      description:
        "Resolve a URL path against the routes of the current Runable project.",
      inputSchema: resolveRouteInputSchema,
      outputSchema: resolveRouteOutputSchema,
    },
    async ({ path }) => {
      // resolveRoute() is optional on RunableInspectorLike — it was added
      // to Runable's Inspector after the rest of this tool's neighbors, so
      // an older, still-otherwise-compatible installation may not have it.
      // Checked here, per call, rather than at server startup, so that
      // installation doesn't lose every other tool over one missing method.
      if (typeof context.inspector.resolveRoute !== "function") {
        const project = await context.inspector.getProject();
        const installedVersion = project.runableVersion
          ? `runable@${project.runableVersion}`
          : "the installed Runable version";
        throw new RunableInspectorUnavailableError(
          context.rootDir,
          new Error(
            `${installedVersion} does not implement Inspector.resolveRoute().`,
          ),
        );
      }

      // The one and only call this tool ever makes — all route-matching
      // knowledge (dynamic/optional/catch-all params, nested routes, Vue
      // Router semantics) lives in runable/inspector, never here.
      const match = await context.inspector.resolveRoute(path);
      const structuredContent = {
        matched: match !== null,
        match: match ? assertOutputParity(match) : null,
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
