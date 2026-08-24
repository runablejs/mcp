import type {
  DiagnosticContext,
  DiagnosticIssue,
  DiagnosticRule,
} from "../types.js";

export const routeMiddlewareMissingRule: DiagnosticRule = {
  code: "route-middleware-missing",

  run(context: DiagnosticContext): DiagnosticIssue[] {
    const middlewareNames = new Set(
      context.middlewares.map((middleware) => middleware.name),
    );
    const issues: DiagnosticIssue[] = [];

    for (const route of context.routes) {
      for (const name of route.meta?.middleware ?? []) {
        if (middlewareNames.has(name)) continue;

        issues.push({
          code: "route-middleware-missing",
          severity: "error",
          message: `Route "${route.path}" references middleware "${name}", which does not exist.`,
          file: route.file,
          route: route.path,
          suggestion: `Add a middleware named "${name}", or fix the definePageMeta({ middleware }) reference.`,
        });
      }
    }

    return issues;
  },
};
