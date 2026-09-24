/** Clearable calculator number fields — empty string stays empty (not coerced to 0). */

export type NumField = string;

export function numField(n: number): NumField {
  return String(n);
}

/** Parse a field for math. Empty / invalid → null. */
export function parseNum(value: NumField): number | null {
  const t = value.trim();
  if (t === "" || t === "-" || t === "." || t === "-.") return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

/** Controlled number input change: allow clear and partial typing. */
export function setNumField(
  raw: string,
  set: (next: NumField) => void,
): void {
  if (raw === "" || /^-?\d*\.?\d*$/.test(raw)) {
    set(raw);
  }
}

export function roundNumField(n: number): NumField {
  return String(Math.round(n));
}
