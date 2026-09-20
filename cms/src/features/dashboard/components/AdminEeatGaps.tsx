import { Link } from "react-router-dom";
import type { EeatGap } from "@/features/dashboard/utils/adminMetrics";

type Props = {
  gaps: EeatGap[];
};

/** Published pieces missing author or reviewer attribution. */
export function AdminEeatGaps({ gaps }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="font-semibold text-slate-900">EEAT gaps</h2>
        <p className="text-xs text-slate-500">
          Live articles missing Written by / Reviewed by signals.
        </p>
      </div>
      <ul className="divide-y divide-slate-100">
        {gaps.length === 0 ? (
          <li className="px-4 py-6 text-sm text-slate-500">
            No attribution gaps in the loaded set.
          </li>
        ) : (
          gaps.map(({ article, missingAuthor, missingReviewer }) => (
            <li
              key={article.id}
              className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
            >
              <div className="min-w-0">
                <Link
                  to={`/articles/${article.id}`}
                  className="font-medium text-sky-700 hover:underline"
                >
                  {article.title || "Untitled"}
                </Link>
                <p className="text-xs text-amber-800">
                  {[
                    missingAuthor ? "Missing author" : null,
                    missingReviewer ? "Missing reviewer" : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <span className="text-xs text-slate-500">
                {article.categoryLabel || "—"}
              </span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
