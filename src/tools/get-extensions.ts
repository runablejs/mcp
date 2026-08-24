import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/server";

import type { RunableMcpContext } from "../context.js";
import type {
  RunableAutoImportsInfo,
  RunableInspectorLike,
  RunableLayoutInfo,
  RunableMiddlewareInfo,
  RunableModuleInfo,
  RunablePluginInfo,
} from "../runable-inspector.js";

export const EXTENSION_KINDS = [
  "layouts",
  "middlewares",
  "plugins",
  "modules",
  "auto-imports",
] as const;

export type ExtensionKind = (typeof EXTENSION_KINDS)[number];

// Each mirrors its `Inspector*` counterpart from `runable/inspector` — kept
// in sync by hand; `assertOutputParity` below is the compile-time trip wire.
const layoutSchema = z.object({
  name: z.string().describe("Layout name, as registered under :layouts."),
  file: z.string().describe("Layout file, relative to rootDir."),
});
const middlewareSchema = z.object({
  name: z
    .string()
    .describe(
      "Middleware name, as referenced from definePageMeta({ middleware: [...] }).",
    ),
  file: z.string().describe("Middleware file, relative to rootDir."),
  global: z
    .boolean()
    .describe("Whether this middleware runs on every navigation."),
});
const pluginSchema = z.object({
  name: z
    .string()
    .optional()
    .describe("Plugin name, if statically determined."),
  file: z.string().describe("Plugin file, relative to rootDir."),
  enforce: z
    .enum(["pre", "post"])
    .optional()
    .describe("Execution priority group, if statically declared."),
  dependsOn: z
    .array(z.string())
    .optional()
    .describe("Names of plugins this one depends on."),
});
const moduleSchema = z.object({
  name: z.string().describe("Canonical module name."),
  source: z.string().describe("The module's own runable.config.* file."),
  configKey: z
    .string()
    .optional()
    .describe("Key this module's options are configured under."),
  kind: z
    .enum(["local", "package"])
    .describe("Whether this module lives inside rootDir or node_modules."),
});
const importSchema = z.object({
  name: z
    .string()
    .describe("Name available in application code without an explicit import."),
  file: z.string().describe("Source file it's imported from."),
  exportName: z
    .string()
    .optional()
    .describe("Named export it resolves to, when different from name."),
});
const componentSchema = z.object({
  name: z.string().describe("Tag name the component is auto-registered as."),
  file: z.string().describe("Component file."),
});
const autoImportsSchema = z.object({
  components: z.array(componentSchema),
  composables: z.array(importSchema),
  globals: z.array(importSchema),
});

// `items` is faithfully whatever the matching Inspector getter returns for
// that kind — an array for everything except "auto-imports", which is
// itself a `{ components, composables, globals }` object. No kind is forced
// into a shape it doesn't actually have.
export const extensionsOutputSchema = z.object({
  kind: z.enum(EXTENSION_KINDS),
  items: z.union([
    z.array(layoutSchema),
    z.array(middlewareSchema),
    z.array(pluginSchema),
    z.array(moduleSchema),
    autoImportsSchema,
  ]),
});

export const extensionsInputSchema = z.object({
  kind: z
    .enum(EXTENSION_KINDS)
    .describe("Which resolved extension list to return."),
});

const extensionResolvers: {
  layouts: (inspector: RunableInspectorLike) => Promise<RunableLayoutInfo[]>;
  middlewares: (
    inspector: RunableInspectorLike,
  ) => Promise<RunableMiddlewareInfo[]>;
  plugins: (inspector: RunableInspectorLike) => Promise<RunablePluginInfo[]>;
  modules: (inspector: RunableInspectorLike) => Promise<RunableModuleInfo[]>;
  "auto-imports": (
    inspector: RunableInspectorLike,
  ) => Promise<RunableAutoImportsInfo>;
} = {
  layouts: (inspector) => inspector.getLayouts(),
  middlewares: (inspector) => inspector.getMiddlewares(),
  plugins: (inspector) => inspector.getPlugins(),
  modules: (inspector) => inspector.getModules(),
  "auto-imports": (inspector) => inspector.getAutoImports(),
};

/** Compiles only if every resolver's return type still satisfies
 * `extensionsOutputSchema`'s `items` union — a compile-time guard against
 * this package's local Runable*Info types drifting from the schema. */
function assertOutputParity(
  items:
    | RunableLayoutInfo[]
    | RunableMiddlewareInfo[]
    | RunablePluginInfo[]
    | RunableModuleInfo[]
    | RunableAutoImportsInfo,
): z.infer<typeof extensionsOutputSchema>["items"] {
  return items;
}

export function registerGetExtensionsTool(
  server: McpServer,
  context: RunableMcpContext,
): void {
  server.registerTool(
    "get_extensions",
    {
      title: "Get extensions",
      description:
        "Get resolved Runable extensions such as layouts, middleware, plugins, modules, or auto-imports.",
      inputSchema: extensionsInputSchema,
      outputSchema: extensionsOutputSchema,
    },
    async ({ kind }) => {
      const items = await extensionResolvers[kind](context.inspector);
      const structuredContent = { kind, items: assertOutputParity(items) };

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
