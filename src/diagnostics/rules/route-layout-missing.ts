import type {
  DiagnosticContext,
  DiagnosticIssue,
  DiagnosticRule,
} from "../types.js";

export const routeLayoutMissingRule: DiagnosticRule = {
  code: "route-layout-missing",

  run(context: DiagnosticContext): DiagnosticIssue[] {
    const layoutNames = new Set(context.layouts.map((layout) => layout.name));
    const issues: DiagnosticIssue[] = [];

    for (const route of context.routes) {
      const layout = route.meta?.layout;
      // Only a plain string names a layout to look up — `false` explicitly
      // disables the default layout, and anything else isn't something we
      // can resolve without guessing, so it's left alone rather than
      // flagged on a fragile heuristic.
      if (typeof layout !== "string") continue;
      if (layoutNames.has(layout)) continue;

      issues.push({
        code: "route-layout-missing",
        severity: "error",
        message: `Route "${route.path}" references layout "${layout}", which does not exist.`,
        file: route.file,
        route: route.path,
        suggestion: `Add a layout named "${layout}", or fix the definePageMeta({ layout }) reference.`,
      });
    }

    return issues;
  },
};
