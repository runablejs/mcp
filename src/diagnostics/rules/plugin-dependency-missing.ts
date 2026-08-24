import type {
  DiagnosticContext,
  DiagnosticIssue,
  DiagnosticRule,
} from "../types.js";

export const pluginDependencyMissingRule: DiagnosticRule = {
  code: "plugin-dependency-missing",

  run(context: DiagnosticContext): DiagnosticIssue[] {
    const pluginNames = new Set(
      context.plugins
        .map((plugin) => plugin.name)
        .filter((name) => name !== undefined),
    );
    const issues: DiagnosticIssue[] = [];

    for (const plugin of context.plugins) {
      for (const dependency of plugin.dependsOn ?? []) {
        if (pluginNames.has(dependency)) continue;

        issues.push({
          code: "plugin-dependency-missing",
          severity: "error",
          message: `Plugin "${plugin.file}" declares dependsOn: "${dependency}", but no plugin with that name exists.`,
          file: plugin.file,
          suggestion: `Add a plugin named "${dependency}", or remove it from dependsOn.`,
        });
      }
    }

    return issues;
  },
};
