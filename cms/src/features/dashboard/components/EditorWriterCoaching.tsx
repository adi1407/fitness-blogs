import { Link } from "react-router-dom";
import type { Article } from "@/lib/api/client";

type WriterRow = {
  authorId: string;
  name: string;
  live: number;
  inReview: number;
  needsChanges: number;
  rejected: number;
  sendBackRate: number | null;
  total: number;
};

function buildRows(articles: Article[]): WriterRow[] {
  const map = new Map<string, WriterRow>();

  for (const a of articles) {
    const id = a.authorId || "unknown";
    const name = a.authorName?.trim() || "Unknown writer";
    let row = map.get(id);
    if (!row) {
      row = {
        authorId: id,
        name,
        live: 0,
        inReview: 0,
        needsChanges: 0,
        rejected: 0,
        sendBackRate: null,
        total: 0,
      };
      map.set(id, row);
    }
    row.total += 1;
    if (a.status === "published") row.live += 1;
    else if (a.status === "submitted") row.inReview += 1;
    else if (a.status === "changes_requested") row.needsChanges += 1;
    else if (a.status === "rejected") row.rejected += 1;
  }

  return [...map.values()]
    .map((r) => {
      const sentBack = r.needsChanges + r.rejected;
      const denom = sentBack + r.live;
      return {
        ...r,
        sendBackRate: denom === 0 ? null : Math.round((sentBack / denom) * 100),
      };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
}

type Props = {
  articles: Article[];
};

/** Per-author backlog and send-back signal for coaching. */
export function EditorWriterCoaching({ articles }: Props) {
  const rows = buildRows(articles);

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-slate-100 px-4 py-3">
        <div>
          <h2 className="font-semibold text-slate-900">Writer coaching</h2>
          <p className="text-xs text-slate-500">
            Top writers by volume — send-back rate vs live pieces.
          </p>
        </div>
        <Link
          to="/writers"
          className="text-xs font-semibold text-sky-700 hover:underline"
        >
          Writers →
        </Link>
      </div>
      <ul className="divide-y divide-slate-100">
        {rows.length === 0 ? (
          <li className="px-4 py-6 text-sm text-slate-500">No articles yet.</li>
        ) : (
          rows.map((r) => (
            <li
              key={r.authorId}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
            >
              <div>
                <p className="font-medium text-slate-900">{r.name}</p>
                <p className="text-xs text-slate-500">
                  {r.live} live · {r.inReview} in review · {r.needsChanges} needs
                  changes · {r.rejected} rejected
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                {r.sendBackRate === null
                  ? "No signal yet"
                  : `${r.sendBackRate}% send-back`}
              </span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
