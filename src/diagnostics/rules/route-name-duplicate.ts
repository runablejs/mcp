import type {
  DiagnosticContext,
  DiagnosticIssue,
  DiagnosticRule,
} from "../types.js";
import { findDuplicateGroups } from "./group-duplicates.js";

export const routeNameDuplicateRule: DiagnosticRule = {
  code: "route-name-duplicate",

  run(context: DiagnosticContext): DiagnosticIssue[] {
    const duplicates = findDuplicateGroups(
      context.routes,
      (route) => route.name,
    );
    const issues: DiagnosticIssue[] = [];

    for (const [name, routes] of duplicates) {
      const files = routes.map((route) => route.file).join(", ");
      issues.push({
        code: "route-name-duplicate",
        severity: "error",
        message: `Route name "${name}" is used by ${routes.length} routes (${files}); named navigation to it is ambiguous.`,
        suggestion: `Give each route a distinct name, e.g. via definePageMeta({ name }).`,
      });
    }

    return issues;
  },
};
