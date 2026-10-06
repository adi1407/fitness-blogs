/** Lower-case, strip accents and punctuation so "Dal-Rice" matches "dal rice". */
export function normalise(s: string | null | undefined) {
  return (s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0900-\u097f]+/g, " ")
    .trim();
}

/**
 * Relevance of `fields` for the query: title prefix > title word prefix > title contains >
 * secondary fields contain. Every query word must match somewhere, otherwise 0.
 */
export function score(query: string, title: string, secondary: (string | null | undefined)[] = []) {
  const q = normalise(query);
  if (!q) return 0;
  const t = normalise(title);
  const rest = secondary.map(normalise).join(" ");
  const words = q.split(" ");
  if (!words.every((w) => t.includes(w) || rest.includes(w))) return 0;

  let s = 1;
  if (t.startsWith(q)) s += 100;
  else if (t.includes(` ${q}`)) s += 60;
  else if (t.includes(q)) s += 40;
  s += words.filter((w) => t.includes(w)).length * 10;
  return s - t.length / 100;
}
