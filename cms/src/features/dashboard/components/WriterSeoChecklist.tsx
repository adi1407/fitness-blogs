import { Link } from "react-router-dom";
import type { Article } from "@/lib/api/client";
import { seoCompleteness } from "@/features/dashboard/utils/seoCompleteness";
import { isEditableStatus } from "@/features/dashboard/utils/writerMetrics";

type Props = {
  articles: Article[];
};

/** SEO % for up to 5 most recently updated editable pieces. */
export function WriterSeoChecklist({ articles }: Props) {
  const editable = [...articles]
    .filter((a) => isEditableStatus(a.status))
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 5);

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="font-semibold text-slate-900">SEO completeness</h2>
        <p className="text-xs text-slate-500">
          Checklist before you submit — cover, meta, FAQ, and body depth.
        </p>
      </div>
      <ul className="divide-y divide-slate-100">
        {editable.length === 0 ? (
          <li className="px-4 py-6 text-sm text-slate-500">
            No editable drafts to score.
          </li>
        ) : (
          editable.map((a) => {
            const score = seoCompleteness(a);
            return (
              <li key={a.id} className="px-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link
                      to={`/articles/${a.id}`}
                      className="font-medium text-sky-700 hover:underline"
                    >
                      {a.title || "Untitled"}
                    </Link>
                    <p className="mt-1 text-xs text-slate-500">
                      {score.passed}/{score.total} checks · {score.percent}%
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      score.percent >= 85
                        ? "bg-emerald-100 text-emerald-800"
                        : score.percent >= 50
                          ? "bg-amber-100 text-amber-900"
                          : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {score.percent}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: `${score.percent}%` }}
                  />
                </div>
                {score.missing.length > 0 ? (
                  <p className="mt-2 text-xs text-slate-500">
                    Missing: {score.missing.slice(0, 5).join(", ")}
                    {score.missing.length > 5
                      ? ` +${score.missing.length - 5} more`
                      : ""}
                  </p>
                ) : (
                  <p className="mt-2 text-xs font-medium text-emerald-700">
                    Ready to submit from an SEO standpoint.
                  </p>
                )}
                <Link
                  to={`/articles/${a.id}`}
                  className="mt-2 inline-block text-xs font-semibold text-sky-700 hover:underline"
                >
                  Open to fix →
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
