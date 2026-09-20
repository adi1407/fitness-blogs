import { Link } from "react-router-dom";
import type { Article } from "@/lib/api/client";
import { feedbackNote } from "@/features/dashboard/utils/writerMetrics";

type Props = {
  needsChanges: Article[];
  rejected: Article[];
};

function NoteRow({ article, tone }: { article: Article; tone: "amber" | "red" }) {
  const note = feedbackNote(article);
  return (
    <li className="px-4 py-3">
      <Link
        to={`/articles/${article.id}`}
        className="font-medium text-sky-700 hover:underline"
      >
        {article.title || "Untitled"}
      </Link>
      {note ? (
        <p
          className={`mt-1 line-clamp-2 text-sm ${
            tone === "amber" ? "text-amber-900" : "text-red-800"
          }`}
        >
          {note}
        </p>
      ) : (
        <p className="mt-1 text-sm text-slate-500">No note attached.</p>
      )}
    </li>
  );
}

/** Editor feedback — changes requested + rejected with notes. */
export function WriterFeedbackInbox({ needsChanges, rejected }: Props) {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-amber-200 bg-amber-50/40">
        <div className="border-b border-amber-100 px-4 py-3">
          <h2 className="font-semibold text-slate-900">Needs changes</h2>
          <p className="text-xs text-slate-500">
            Editor notes — open and revise, then resubmit.
          </p>
        </div>
        <ul className="divide-y divide-amber-100">
          {needsChanges.length === 0 ? (
            <li className="px-4 py-6 text-sm text-slate-500">
              No feedback waiting.
            </li>
          ) : (
            needsChanges.map((a) => (
              <NoteRow key={a.id} article={a} tone="amber" />
            ))
          )}
        </ul>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="font-semibold text-slate-900">Rejected</h2>
          <p className="text-xs text-slate-500">
            Can still be edited and resubmitted as a new draft path.
          </p>
        </div>
        <ul className="divide-y divide-slate-100">
          {rejected.length === 0 ? (
            <li className="px-4 py-6 text-sm text-slate-500">None.</li>
          ) : (
            rejected.map((a) => <NoteRow key={a.id} article={a} tone="red" />)
          )}
        </ul>
      </div>
    </section>
  );
}
