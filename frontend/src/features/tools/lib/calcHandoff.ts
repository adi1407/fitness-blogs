/**
 * Explicit value handoff between calculators via the URL (e.g. TDEE result →
 * calorie calculator). Nothing is persisted, so opening a calculator directly
 * always starts from its own defaults.
 */

const LEGACY_PREFS_PREFIX = "fitlives-calc-prefs:";

export function handoffHref(
  path: string,
  params: Record<string, string | number | null | undefined>,
): string {
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === null || v === undefined || v === "") continue;
    search.set(k, String(v));
  }
  const qs = search.toString();
  return qs ? `${path}?${qs}` : path;
}

/**
 * Read handed-off values once, then strip them from the address bar so a
 * reload or later visit does not bring them back. Client-only.
 */
export function takeHandoff<K extends string>(
  keys: readonly K[],
): Partial<Record<K, string>> {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  const out: Partial<Record<K, string>> = {};
  let found = false;
  for (const k of keys) {
    const v = url.searchParams.get(k);
    if (v !== null) {
      out[k] = v;
      url.searchParams.delete(k);
      found = true;
    }
  }
  if (found) {
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }
  return out;
}

/** Validated positive number within a range, or null. */
export function handoffNumber(
  raw: string | undefined,
  min: number,
  max: number,
): number | null {
  if (raw === undefined) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n >= min && n <= max ? n : null;
}

/** Remove per-member input caches written by older builds. */
export function clearLegacyCalcPrefs(): void {
  if (typeof window === "undefined") return;
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k?.startsWith(LEGACY_PREFS_PREFIX)) localStorage.removeItem(k);
    }
  } catch {
    /* storage unavailable */
  }
}
