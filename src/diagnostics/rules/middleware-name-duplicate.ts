import type {
  DiagnosticContext,
  DiagnosticIssue,
  DiagnosticRule,
} from "../types.js";
import { findDuplicateGroups } from "./group-duplicates.js";

export const middlewareNameDuplicateRule: DiagnosticRule = {
  code: "middleware-name-duplicate",

  run(context: DiagnosticContext): DiagnosticIssue[] {
    const duplicates = findDuplicateGroups(
      context.middlewares,
      (middleware) => middleware.name,
    );
    const issues: DiagnosticIssue[] = [];

    for (const [name, middlewares] of duplicates) {
      const files = middlewares.map((middleware) => middleware.file).join(", ");
      issues.push({
        code: "middleware-name-duplicate",
        severity: "warning",
        message: `Middleware name "${name}" is registered by ${middlewares.length} files (${files}); definePageMeta({ middleware: ["${name}"] }) will resolve to only one of them.`,
        suggestion: `Rename one of the middleware files, or move one under a different scan directory.`,
      });
    }

    return issues;
  },
};
