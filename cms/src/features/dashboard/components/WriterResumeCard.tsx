import { Link } from "react-router-dom";
import type { Article } from "@/lib/api/client";
import { formatRelativeEdited } from "@/features/dashboard/utils/writerMetrics";

type Props = {
  article: Article | null;
};

/** One-click resume for the most recently edited draftable piece. */
export function WriterResumeCard({ article }: Props) {
  if (!article) {
    return (
      <section className="rounded-xl border border-dashed border-slate-300 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Resume writing</h2>
        <p className="mt-2 text-sm text-slate-600">
          No drafts yet. Start a new guide and it will show up here.
        </p>
        <Link
          to="/articles/new"
          className="mt-4 inline-flex rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          Write article
        </Link>
      </section>
    );
  }

  const statusLabel =
    article.status === "changes_requested"
      ? "Needs changes"
      : article.status.replace("_", " ");

  return (
    <section className="rounded-xl border border-sky-200 bg-sky-50/60 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
        Resume last draft
      </p>
      <h2 className="mt-2 text-xl font-semibold text-slate-900">
        {article.title || "Untitled"}
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        <span className="capitalize">{statusLabel}</span>
        {" · "}
        Last edited {formatRelativeEdited(article.updatedAt)}
        {article.categoryLabel ? ` · ${article.categoryLabel}` : ""}
      </p>
      <Link
        to={`/articles/${article.id}`}
        className="mt-4 inline-flex rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
      >
        Continue editing →
      </Link>
    </section>
  );
}
