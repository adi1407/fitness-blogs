import { Link } from "react-router-dom";
import type { Article } from "@/lib/api/client";
import { daysWaiting } from "@/features/dashboard/utils/writerMetrics";

type Props = {
  articles: Article[];
};

/** Submitted pieces sorted by longest wait first. */
export function WriterReviewQueue({ articles }: Props) {
  const sorted = [...articles].sort(
    (a, b) => daysWaiting(b.updatedAt) - daysWaiting(a.updatedAt),
  );

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="font-semibold text-slate-900">In review</h2>
        <p className="text-xs text-slate-500">
          Days waiting since submit (longest first).
        </p>
      </div>
      <ul className="divide-y divide-slate-100">
        {sorted.length === 0 ? (
          <li className="px-4 py-6 text-sm text-slate-500">
            Nothing in the review queue.
          </li>
        ) : (
          sorted.map((a) => {
            const days = daysWaiting(a.updatedAt);
            return (
              <li
                key={a.id}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >
                <div className="min-w-0">
                  <Link
                    to={`/articles/${a.id}`}
                    className="font-medium text-sky-700 hover:underline"
                  >
                    {a.title || "Untitled"}
                  </Link>
                  <p className="truncate text-xs text-slate-500">
                    {a.categoryLabel || "Uncategorized"}
                    {a.subcategoryLabel ? ` / ${a.subcategoryLabel}` : ""}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                  {days === 0 ? "Submitted today" : `${days}d in review`}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
