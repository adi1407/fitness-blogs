import { Link } from "react-router-dom";
import type { Article } from "@/lib/api/client";

type Props = {
  articles: Article[];
};

const SITE_ORIGIN =
  import.meta.env.VITE_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Site-wide top live articles by CMS views. */
export function AdminTopViews({ articles }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="font-semibold text-slate-900">Top articles by views</h2>
        <p className="text-xs text-slate-500">
          Strong pages to refresh; weak views may need better titles or links.
        </p>
      </div>
      <ul className="divide-y divide-slate-100">
        {articles.length === 0 ? (
          <li className="px-4 py-6 text-sm text-slate-500">No live articles.</li>
        ) : (
          articles.map((a, i) => {
            const url = a.path
              ? `${SITE_ORIGIN.replace(/\/$/, "")}${a.path}`
              : null;
            return (
              <li
                key={a.id}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400">#{i + 1}</p>
                  <Link
                    to={`/articles/${a.id}`}
                    className="font-medium text-sky-700 hover:underline"
                  >
                    {a.title || "Untitled"}
                  </Link>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-0.5 block truncate text-xs text-slate-500 hover:underline"
                    >
                      View live →
                    </a>
                  ) : null}
                </div>
                <span className="shrink-0 text-sm font-semibold text-slate-700">
                  {(a.views ?? 0).toLocaleString()}
                </span>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
