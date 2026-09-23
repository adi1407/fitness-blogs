import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiFetch, type CmsKnowledgePage } from "@/lib/api/client";

const LABELS: Record<string, string> = {
  programs: "Programs",
  reviews: "Reviews",
};

function sectionFromPath(pathname: string): "programs" | "reviews" {
  return pathname.startsWith("/reviews") ? "reviews" : "programs";
}

export default function KnowledgePagesListPage() {
  const { pathname } = useLocation();
  const section = sectionFromPath(pathname);
  const label = LABELS[section] ?? section;
  const [pages, setPages] = useState<CmsKnowledgePage[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    void apiFetch<{ pages: CmsKnowledgePage[] }>(
      `/knowledge-pages?section=${section}`,
    )
      .then((data) => setPages(data.pages))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load"),
      );
  }, [section]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{label}</h1>
          <p className="mt-1 text-slate-600">
            Hub copy uses slug <code className="text-xs">_hub</code>. Add more
            pages anytime — they appear under /{section}/[slug].
          </p>
        </div>
        <Link
          to={`/${section}/new`}
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          New page
        </Link>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pages.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                  No pages yet.
                </td>
              </tr>
            ) : (
              pages.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link
                      to={`/${section}/${p.id}`}
                      className="font-medium text-sky-700 hover:underline"
                    >
                      {p.title}
                      {p.isHub ? (
                        <span className="ml-2 rounded bg-amber-50 px-1.5 py-0.5 text-xs text-amber-800">
                          hub
                        </span>
                      ) : null}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{p.slug}</td>
                  <td className="px-4 py-3">{p.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
