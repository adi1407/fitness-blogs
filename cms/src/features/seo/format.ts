const numberFmt = new Intl.NumberFormat("en-IN");
const compactFmt = new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 });

export function formatCount(n: number): string {
  return n >= 100_000 ? compactFmt.format(n) : numberFmt.format(n);
}

export function formatCtr(ctr: number): string {
  return `${(ctr * 100).toFixed(ctr > 0 && ctr < 0.01 ? 2 : 1)}%`;
}

export function formatPosition(position: number | null): string {
  return position == null ? "—" : position.toFixed(1);
}

export function formatDay(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function formatAgo(iso: string): string {
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours} h ago`;
  return `${Math.round(hours / 24)} days ago`;
}

export type Delta = { label: string; tone: "up" | "down" | "flat" };

/** Change vs the previous period. For position, lower is better, so a drop reads as "up". */
export function delta(current: number | null, previous: number | null, kind: "count" | "position" = "count"): Delta {
  if (current == null || previous == null) return { label: "—", tone: "flat" };
  if (kind === "position") {
    const diff = previous - current;
    if (Math.abs(diff) < 0.05) return { label: "no change", tone: "flat" };
    return { label: `${diff > 0 ? "▲" : "▼"} ${Math.abs(diff).toFixed(1)}`, tone: diff > 0 ? "up" : "down" };
  }
  if (previous === 0) return current > 0 ? { label: "new", tone: "up" } : { label: "—", tone: "flat" };
  const pct = ((current - previous) / previous) * 100;
  if (Math.abs(pct) < 0.5) return { label: "no change", tone: "flat" };
  return { label: `${pct > 0 ? "+" : ""}${pct.toFixed(0)}%`, tone: pct > 0 ? "up" : "down" };
}
