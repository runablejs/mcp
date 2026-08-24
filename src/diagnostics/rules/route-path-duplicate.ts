import type {
  DiagnosticContext,
  DiagnosticIssue,
  DiagnosticRule,
} from "../types.js";
import { findDuplicateGroups } from "./group-duplicates.js";

export const routePathDuplicateRule: DiagnosticRule = {
  code: "route-path-duplicate",

  run(context: DiagnosticContext): DiagnosticIssue[] {
    const duplicates = findDuplicateGroups(
      context.routes,
      (route) => route.path,
    );
    const issues: DiagnosticIssue[] = [];

    for (const [path, routes] of duplicates) {
      const files = routes.map((route) => route.file).join(", ");
      issues.push({
        code: "route-path-duplicate",
        severity: "error",
        message: `Route path "${path}" is resolved by ${routes.length} different pages (${files}); only one will actually be reachable.`,
        route: path,
        suggestion: `Give each page a distinct path, e.g. via definePageMeta({ path }).`,
      });
    }

    return issues;
  },
};
