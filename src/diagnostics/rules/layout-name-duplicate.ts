import type {
  DiagnosticContext,
  DiagnosticIssue,
  DiagnosticRule,
} from "../types.js";
import { findDuplicateGroups } from "./group-duplicates.js";

export const layoutNameDuplicateRule: DiagnosticRule = {
  code: "layout-name-duplicate",

  run(context: DiagnosticContext): DiagnosticIssue[] {
    const duplicates = findDuplicateGroups(
      context.layouts,
      (layout) => layout.name,
    );
    const issues: DiagnosticIssue[] = [];

    for (const [name, layouts] of duplicates) {
      const files = layouts.map((layout) => layout.file).join(", ");
      issues.push({
        code: "layout-name-duplicate",
        severity: "warning",
        message: `Layout name "${name}" is registered by ${layouts.length} files (${files}); definePageMeta({ layout: "${name}" }) will resolve to only one of them.`,
        suggestion: `Rename one of the layout files, or move one under a different scan directory.`,
      });
    }

    return issues;
  },
};
