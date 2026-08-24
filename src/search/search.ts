import type { ApiSearchResult, DocsIndexEntry } from "./types.js";

/** Splits a query into lowercase word tokens, dropping anything shorter
 * than 3 characters — short common words ("a", "to", "is") would otherwise
 * substring-match almost every entry and drown out real signal. */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9_]+/)
    .filter((token) => token.length >= 3);
}

/** Whole-word containment check (unlike a raw substring test, "term"
 * doesn't spuriously match inside "determine"). */
function containsWord(haystack: string, word: string): boolean {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`).test(haystack);
}

/**
 * Deliberately simple, deterministic, offline scoring — no embeddings, no
 * network, no external index. Weighted so that an exact title/heading
 * match (the common case: an agent asking about a known API symbol like
 * "useAsyncData") ranks far above an incidental content mention.
 */
function scoreEntry(
  entry: DocsIndexEntry,
  query: string,
  queryTokens: string[],
): number {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return 0;

  const title = entry.title.toLowerCase();
  const section = entry.section.toLowerCase();
  const content = entry.content.toLowerCase();

  let score = 0;

  if (title === normalizedQuery) score += 100;
  else if (title.includes(normalizedQuery)) score += 50;

  if (section === normalizedQuery) score += 80;
  else if (section.includes(normalizedQuery)) score += 40;

  // An exact inline-code symbol match, e.g. a query for "definePageMeta"
  // landing on a section whose content contains `definePageMeta` verbatim.
  if (content.includes(`\`${normalizedQuery}\``)) score += 60;

  if (content.includes(normalizedQuery)) score += 20;

  for (const token of queryTokens) {
    if (containsWord(title, token)) score += 6;
    if (containsWord(section, token)) score += 4;
    if (containsWord(content, token)) score += 2;
  }

  return score;
}

export function searchDocs(
  index: DocsIndexEntry[],
  query: string,
  limit: number,
): ApiSearchResult[] {
  const queryTokens = tokenize(query);

  return index
    .map((entry) => ({ entry, score: scoreEntry(entry, query, queryTokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry, score }) => ({
      title: entry.title,
      path: entry.url,
      section: entry.section,
      excerpt: entry.excerpt,
      score,
    }));
}
