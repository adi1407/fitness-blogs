import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, type AssignmentBrief } from "@/lib/api/client";

/** Open and in-progress briefs for the signed-in writer. */
export function WriterAssignments() {
  const [briefs, setBriefs] = useState<AssignmentBrief[]>([]);

  useEffect(() => {
    void (async () => {
      try {
        const data = await apiFetch<{ briefs: AssignmentBrief[] }>("/briefs");
        setBriefs(data.briefs.slice(0, 3));
      } catch {
        setBriefs([]);
      }
    })();
  }, []);

  if (briefs.length === 0) return null;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Your assignments</h2>
        <Link to="/assignments" className="text-sm font-semibold text-sky-700 hover:underline">
          All assignments
        </Link>
      </div>
      <ul className="mt-3 divide-y divide-slate-100">
        {briefs.map((brief) => (
          <li key={brief.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
            <div>
              <p className="font-medium text-slate-900">
                {brief.workingTitle || brief.targetQuery}
              </p>
              <p className="text-xs text-slate-500">
                {brief.categoryLabel}
                {brief.dueOn ? ` · Due ${brief.dueOn}` : ""}
                {brief.status === "in_progress" ? " · Draft started" : " · Not started"}
              </p>
            </div>
            <Link
              to={brief.articleId ? `/articles/${brief.articleId}` : "/assignments"}
              className="text-sm font-semibold text-sky-700 hover:underline"
            >
              {brief.articleId ? "Continue" : "Start"}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
