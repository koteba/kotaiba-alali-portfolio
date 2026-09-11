// A small, dependency-free deep merge used to layer admin overrides
// on top of the default content object. Arrays are replaced wholesale
// (not merged item-by-item) because the admin panel always writes back
// a full array when it edits a list (skills, projects, experience, etc).

export function deepMerge<T>(base: T, override: Partial<T> | undefined | null): T {
  if (!override) return base;
  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as unknown as T;
  }
  if (typeof base === 'object' && base !== null && typeof override === 'object') {
    const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    const overrideRecord = override as Record<string, unknown>;
    const baseRecord = base as Record<string, unknown>;
    for (const key of Object.keys(overrideRecord)) {
      const overrideValue = overrideRecord[key];
      const baseValue = baseRecord[key];
      if (overrideValue === undefined) continue;
      if (
        typeof overrideValue === 'object' &&
        overrideValue !== null &&
        typeof baseValue === 'object' &&
        baseValue !== null
      ) {
        result[key] = deepMerge(baseValue, overrideValue);
      } else {
        result[key] = overrideValue;
      }
    }
    return result as T;
  }
  return (override as unknown as T) ?? base;
}
