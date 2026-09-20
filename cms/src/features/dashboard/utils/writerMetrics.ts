import type { Article } from "@/lib/api/client";

const EDITABLE = new Set(["draft", "changes_requested", "rejected"]);

export function isEditableStatus(status: Article["status"]): boolean {
  return EDITABLE.has(status);
}

/** Most recently updated editable piece (resume target). */
export function pickResumeArticle(articles: Article[]): Article | null {
  const editable = articles.filter((a) => isEditableStatus(a.status));
  if (editable.length === 0) return null;
  return [...editable].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )[0];
}

/** Days since updatedAt (submit bumps updated_at). */
export function daysWaiting(updatedAt: string, now = Date.now()): number {
  const t = new Date(updatedAt).getTime();
  if (Number.isNaN(t)) return 0;
  return Math.max(0, Math.floor((now - t) / (24 * 60 * 60 * 1000)));
}

export function startOfLocalWeek(d = new Date()): Date {
  const date = new Date(d);
  const day = date.getDay(); // 0 Sun
  const diff = day === 0 ? -6 : 1 - day; // Monday start
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + diff);
  return date;
}

export function endOfLocalWeek(d = new Date()): Date {
  const start = startOfLocalWeek(d);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return end;
}

/** Published this local calendar week (Mon–Sun). */
export function publishedThisWeek(articles: Article[], now = new Date()): Article[] {
  const start = startOfLocalWeek(now).getTime();
  const end = endOfLocalWeek(now).getTime();
  return articles.filter((a) => {
    if (a.status !== "published" || !a.publishedAt) return false;
    const t = new Date(a.publishedAt).getTime();
    return !Number.isNaN(t) && t >= start && t < end;
  });
}

export function formatRelativeEdited(updatedAt: string): string {
  const days = daysWaiting(updatedAt);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(updatedAt).toLocaleDateString();
}

export function feedbackNote(article: Article): string {
  return (article.editorNote || article.rejectReason || "").trim();
}

export const PILLAR_SLUGS = [
  "muscle-building",
  "weight-loss",
  "nutrition",
] as const;

export type PillarSlug = (typeof PILLAR_SLUGS)[number];

export const PILLAR_LABELS: Record<PillarSlug, string> = {
  "muscle-building": "Muscle Building",
  "weight-loss": "Weight Loss",
  nutrition: "Nutrition",
};
