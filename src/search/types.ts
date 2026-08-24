/**
 * One searchable unit of the embedded documentation index — either a whole
 * doc page (its content before the first heading) or one heading section
 * within it. Shared between the generation script (scripts/generate-docs-
 * index.ts, dev-only) and the runtime search module (search.ts, published).
 */
export interface DocsIndexEntry {
  /** The doc page's own title (frontmatter `title`). */
  title: string;
  /** Full public URL to the page, e.g. "https://.../docs/api/composables/use-async-data". */
  url: string;
  /** Heading text for this section, or the page's own description for the page-level entry. */
  section: string;
  /** Short, human-readable preview — the section's first paragraph, truncated. */
  excerpt: string;
  /** Full plain-text section content, searched against but never returned as-is. */
  content: string;
  /** Top-level doc category, e.g. "guide", "api", "integrations". */
  category: string;
}

export interface DocsIndexMeta {
  /** The `runable` package version the indexed documentation describes. */
  runableVersion: string;
  /** ISO timestamp of when this index was generated. */
  generatedAt: string;
  /** Number of source Markdown files the index was built from. */
  sourceFileCount: number;
}

export interface ApiSearchResult {
  title: string;
  /** Full public URL to the matched documentation page. */
  path: string;
  section?: string;
  excerpt: string;
  score: number;
}
