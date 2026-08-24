/** Groups `items` by `keyOf(item)`, returning only the groups with more
 * than one member — shared by every "duplicate X" rule below. */
export function findDuplicateGroups<T>(
  items: T[],
  keyOf: (item: T) => string | undefined,
): Map<string, T[]> {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const key = keyOf(item);
    if (key === undefined) continue;
    const group = groups.get(key);
    if (group) group.push(item);
    else groups.set(key, [item]);
  }

  for (const [key, group] of groups) {
    if (group.length < 2) groups.delete(key);
  }

  return groups;
}
