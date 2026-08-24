import { diagnosticRules } from "./rules/index.js";
import type {
  DiagnosticContext,
  DiagnosticIssue,
  DiagnosticResult,
} from "./types.js";

export async function runDiagnostics(
  context: DiagnosticContext,
): Promise<DiagnosticResult> {
  const perRule = await Promise.all(
    diagnosticRules.map((rule) => rule.run(context)),
  );
  const issues: DiagnosticIssue[] = perRule.flat();

  const summary = { errors: 0, warnings: 0, info: 0 };
  for (const issue of issues) {
    if (issue.severity === "error") summary.errors++;
    else if (issue.severity === "warning") summary.warnings++;
    else summary.info++;
  }

  return { valid: summary.errors === 0, summary, issues };
}
