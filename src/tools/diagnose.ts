import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/server";

import type { RunableMcpContext } from "../context.js";
import { buildDiagnosticContext } from "../diagnostics/context.js";
import { runDiagnostics } from "../diagnostics/diagnose.js";
import type { DiagnosticResult } from "../diagnostics/types.js";

// Mirrors DiagnosticIssue/DiagnosticResult from ../diagnostics/types.ts —
// kept in sync by hand; `assertOutputParity` below is the compile-time
// trip wire.
const issueSchema = z.object({
  code: z
    .string()
    .describe(
      'Stable, machine-matchable identifier, e.g. "route-layout-missing".',
    ),
  severity: z.enum(["info", "warning", "error"]),
  message: z.string(),
  file: z.string().optional(),
  route: z.string().optional(),
  suggestion: z.string().optional(),
});

export const diagnoseOutputSchema = z.object({
  valid: z
    .boolean()
    .describe("false whenever at least one error-severity issue was found."),
  summary: z.object({
    errors: z.number(),
    warnings: z.number(),
    info: z.number(),
  }),
  issues: z.array(issueSchema),
});

/** Compiles only if `DiagnosticResult` (this package's own contract, see
 * diagnostics/types.ts) still satisfies `diagnoseOutputSchema`'s inferred
 * shape — a compile-time guard against the two silently drifting apart. */
function assertOutputParity(
  result: DiagnosticResult,
): z.infer<typeof diagnoseOutputSchema> {
  return result;
}

export function registerDiagnoseTool(
  server: McpServer,
  context: RunableMcpContext,
): void {
  server.registerTool(
    "diagnose",
    {
      title: "Diagnose",
      description:
        "Analyze the current Runable project and report actionable configuration and structural issues " +
        "(missing layout/middleware references, duplicate route names/paths, ...).",
      outputSchema: diagnoseOutputSchema,
    },
    async () => {
      const diagnosticContext = await buildDiagnosticContext(context.inspector);
      const result = await runDiagnostics(diagnosticContext);
      const structuredContent = assertOutputParity(result);

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
