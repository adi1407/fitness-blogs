import { Link } from "react-router-dom";
import type { Article } from "@/lib/api/client";

const STALE_DAYS = 180;

/** Live articles past review age. */
export function staleArticles(
  articles: Article[],
  days = STALE_DAYS,
): Article[] {
  const cutoff = Date.now() - days * 86_400_000;
  return articles
    .filter((a) => a.status === "published")
    .filter((a) => {
      const raw = a.lastReviewedAt || a.publishedAt;
      if (!raw) return true;
      return new Date(raw).getTime() < cutoff;
    })
    .sort((a, b) => {
      const ta = new Date(a.lastReviewedAt || a.publishedAt || 0).getTime();
      const tb = new Date(b.lastReviewedAt || b.publishedAt || 0).getTime();
      return ta - tb;
    });
}

type Props = {
  articles: Article[];
  days?: number;
};

export function StaleContentQueue({ articles, days = STALE_DAYS }: Props) {
  const stale = staleArticles(articles, days).slice(0, 12);
  if (stale.length === 0) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Stale content</h2>
        <p className="mt-2 text-sm text-slate-500">
          No live articles older than {days} days without a review date.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="font-semibold text-slate-900">Stale content</h2>
      <p className="mt-1 text-sm text-slate-500">
        Live URLs past {days} days since last review — refresh or re-review.
      </p>
      <ul className="mt-4 divide-y divide-slate-100">
        {stale.map((a) => {
          const when = a.lastReviewedAt || a.publishedAt;
          return (
            <li
              key={a.id}
              className="flex flex-wrap items-center justify-between gap-2 py-3"
            >
              <div>
                <p className="font-medium text-slate-900">
                  {a.title || "Untitled"}
                </p>
                <p className="text-xs text-slate-500">
                  {a.categoryLabel}
                  {when
                    ? ` · Last review ${new Date(when).toLocaleDateString()}`
                    : " · No review date"}
                </p>
              </div>
              <Link
                to={`/articles/${a.id}`}
                className="text-sm font-semibold text-sky-700 hover:underline"
              >
                Open
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
