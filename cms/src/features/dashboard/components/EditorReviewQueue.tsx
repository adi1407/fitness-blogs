import { Link } from "react-router-dom";
import type { Article } from "@/lib/api/client";
import { editorQuality } from "@/features/dashboard/utils/seoCompleteness";
import { daysWaiting } from "@/features/dashboard/utils/writerMetrics";
import type { EditorAction } from "@/features/dashboard/utils/editorTransitions";

const SITE_ORIGIN =
  import.meta.env.VITE_PUBLIC_SITE_URL ?? "http://localhost:3000";

type Props = {
  articles: Article[];
  selectedIds: Set<string>;
  claimedIds: Set<string>;
  busyId: string | null;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onToggleClaim: (id: string) => void;
  onAction: (article: Article, action: EditorAction) => void;
};

/** Wait-sorted submitted queue with quality % and row actions. */
export function EditorReviewQueue({
  articles,
  selectedIds,
  claimedIds,
  busyId,
  onToggleSelect,
  onToggleSelectAll,
  onToggleClaim,
  onAction,
}: Props) {
  const sorted = [...articles].sort(
    (a, b) => daysWaiting(b.updatedAt) - daysWaiting(a.updatedAt),
  );
  const allSelected =
    sorted.length > 0 && sorted.every((a) => selectedIds.has(a.id));

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
        <div>
          <h2 className="font-semibold text-slate-900">Review queue</h2>
          <p className="text-xs text-slate-500">
            Submitted pieces — longest wait first.
          </p>
        </div>
        {sorted.length > 0 ? (
          <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onToggleSelectAll}
            />
            Select all
          </label>
        ) : null}
      </div>

      <ul className="divide-y divide-slate-100">
        {sorted.length === 0 ? (
          <li className="px-4 py-8 text-sm text-slate-500">
            Queue is clear — nothing submitted.
          </li>
        ) : (
          sorted.map((a) => {
            const q = editorQuality(a);
            const days = daysWaiting(a.updatedAt);
            const claimed = claimedIds.has(a.id);
            const busy = busyId === a.id;
            const publicPath = a.path
              ? `${SITE_ORIGIN.replace(/\/$/, "")}${a.path}`
              : null;

            return (
              <li key={a.id} className="px-4 py-4">
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={selectedIds.has(a.id)}
                    onChange={() => onToggleSelect(a.id)}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to={`/articles/${a.id}`}
                          className="font-semibold text-sky-700 hover:underline"
                        >
                          {a.title || "Untitled"}
                        </Link>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {a.authorName || "Unknown writer"}
                          {a.categoryLabel ? ` · ${a.categoryLabel}` : ""}
                          {a.subcategoryLabel ? ` / ${a.subcategoryLabel}` : ""}
                        </p>
                        {publicPath ? (
                          <p className="mt-0.5 truncate text-xs text-slate-400">
                            {a.path}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {claimed ? (
                          <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-800">
                            You reviewing
                          </span>
                        ) : null}
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                          {days === 0 ? "Today" : `${days}d wait`}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            q.ready
                              ? "bg-emerald-100 text-emerald-800"
                              : q.criticalFail
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-900"
                          }`}
                        >
                          {q.percent}% quality
                        </span>
                      </div>
                    </div>

                    {q.missing.length > 0 ? (
                      <p className="mt-2 text-xs text-slate-500">
                        Gates: {q.missing.slice(0, 4).join(", ")}
                        {q.missing.length > 4
                          ? ` +${q.missing.length - 4}`
                          : ""}
                      </p>
                    ) : (
                      <p className="mt-2 text-xs font-medium text-emerald-700">
                        Quality gates look good.
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => onToggleClaim(a.id)}
                        className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                      >
                        {claimed ? "Unclaim" : "I’m reviewing"}
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => onAction(a, "publish")}
                        className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                      >
                        Publish
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => onAction(a, "request-changes")}
                        className="rounded-md bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
                      >
                        Request changes
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => onAction(a, "reject")}
                        className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        Reject
                      </button>
                      <Link
                        to={`/articles/${a.id}`}
                        className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-50"
                      >
                        Open →
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
