import type { Article } from "@/lib/api/client";
import type { StaffUser } from "@/lib/api/client";
import { BLOG_TAXONOMY } from "@/constants/blogTaxonomy";
import { editorQuality } from "@/features/dashboard/utils/seoCompleteness";
import { daysWaiting } from "@/features/dashboard/utils/writerMetrics";

export type PillarHealth = {
  slug: string;
  label: string;
  live: number;
  inReview: number;
  drafts: number;
  thinLive: number;
  empty: boolean;
};

export type EeatGap = {
  article: Article;
  missingAuthor: boolean;
  missingReviewer: boolean;
};

export type InactiveWriter = {
  user: StaffUser;
  articleCount: number;
  lastLiveAt: string | null;
  daysSinceLive: number | null;
};

/** Published count + thin live (quality &lt; 85%) per locked pillar. */
export function pillarHealth(articles: Article[]): PillarHealth[] {
  return BLOG_TAXONOMY.map((cat) => {
    const inPillar = articles.filter((a) => a.categorySlug === cat.slug);
    const live = inPillar.filter((a) => a.status === "published");
    const thinLive = live.filter((a) => !editorQuality(a).ready).length;
    return {
      slug: cat.slug,
      label: cat.label,
      live: live.length,
      inReview: inPillar.filter((a) => a.status === "submitted").length,
      drafts: inPillar.filter(
        (a) =>
          a.status === "draft" ||
          a.status === "changes_requested" ||
          a.status === "rejected",
      ).length,
      thinLive,
      empty: live.length === 0,
    };
  });
}

/** Live articles missing author name or reviewer name. */
export function eeatGaps(articles: Article[]): EeatGap[] {
  return articles
    .filter((a) => a.status === "published")
    .map((a) => ({
      article: a,
      missingAuthor: !a.authorName?.trim(),
      missingReviewer: !a.reviewerName?.trim(),
    }))
    .filter((g) => g.missingAuthor || g.missingReviewer)
    .slice(0, 12);
}

/** Writers with no live article in the last 30 days (or never). */
export function inactiveWriters(
  users: StaffUser[],
  articles: Article[],
  now = Date.now(),
): InactiveWriter[] {
  const writers = users.filter((u) => u.role === "writer" && u.isActive);
  const THIRTY = 30;

  return writers
    .map((user) => {
      const theirs = articles.filter((a) => a.authorId === user.id);
      const live = theirs
        .filter((a) => a.status === "published" && a.publishedAt)
        .sort(
          (a, b) =>
            new Date(b.publishedAt!).getTime() -
            new Date(a.publishedAt!).getTime(),
        );
      const lastLiveAt = live[0]?.publishedAt ?? null;
      const daysSinceLive = lastLiveAt ? daysWaiting(lastLiveAt, now) : null;
      return {
        user,
        articleCount: theirs.length,
        lastLiveAt,
        daysSinceLive,
      };
    })
    .filter(
      (w) =>
        w.daysSinceLive === null || w.daysSinceLive >= THIRTY,
    )
    .sort(
      (a, b) =>
        (b.daysSinceLive ?? 9999) - (a.daysSinceLive ?? 9999),
    )
    .slice(0, 8);
}

export function topViewedLive(articles: Article[], limit = 8): Article[] {
  return [...articles]
    .filter((a) => a.status === "published")
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, limit);
}

export function queueSnapshot(articles: Article[]) {
  const submitted = articles.filter((a) => a.status === "submitted");
  const waits = submitted.map((a) => daysWaiting(a.updatedAt));
  return {
    submitted: submitted.length,
    oldestWait: waits.length ? Math.max(...waits) : 0,
  };
}
