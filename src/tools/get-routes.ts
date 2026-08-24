import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/server";

import type { RunableMcpContext } from "../context.js";
import type { RunableRouteInfo } from "../runable-inspector.js";

// Mirrors `InspectorRoute` from `runable/inspector` — kept in sync with it
// manually; `assertOutputParity` below is the compile-time trip wire.
// Exported so resolve-route.ts can reuse the exact same shape rather than
// redeclaring it.
export const routeSchema = z.object({
  name: z
    .string()
    .optional()
    .describe("Route name, if Runable could resolve one."),
  path: z.string().describe("Resolved route path, e.g. /users/:id."),
  file: z
    .string()
    .describe("Page file this route renders, relative to rootDir."),
  parent: z
    .string()
    .optional()
    .describe(
      "File of the layout route this route is nested under, relative to rootDir.",
    ),
  meta: z
    .object({
      layout: z
        .unknown()
        .optional()
        .describe(
          "Layout selection, as declared via definePageMeta({ layout: ... }).",
        ),
      middleware: z
        .array(z.string())
        .optional()
        .describe("Middleware names applied to this route."),
    })
    .catchall(z.unknown())
    .optional()
    .describe("Statically-declared definePageMeta() fields."),
});

// The MCP wire format requires structuredContent to be a JSON object, so a
// bare `InspectorRoute[]` is wrapped under an explicit `routes` key — the
// array itself, and every route in it, is otherwise untouched.
export const routesOutputSchema = z.object({
  routes: z.array(routeSchema),
});

/** Compiles only if `RunableRouteInfo[]` (this package's own contract, see
 * runable-inspector.ts) still satisfies `routeSchema`'s inferred shape — a
 * compile-time guard against the two silently drifting apart. */
function assertOutputParity(
  routes: RunableRouteInfo[],
): z.infer<typeof routesOutputSchema>["routes"] {
  return routes;
}

export function registerGetRoutesTool(
  server: McpServer,
  context: RunableMcpContext,
): void {
  server.registerTool(
    "get_routes",
    {
      title: "Get routes",
      description:
        "Get the routes currently resolved by Runable for the current project.",
      outputSchema: routesOutputSchema,
    },
    async () => {
      const routes = await context.inspector.getRoutes();
      const structuredContent = { routes: assertOutputParity(routes) };

      return {
        content: [
          { type: "text" as const, text: JSON.stringify(routes, null, 2) },
        ],
        structuredContent,
      };
    },
  );
}
