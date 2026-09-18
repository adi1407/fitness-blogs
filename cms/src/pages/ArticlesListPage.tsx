import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BLOG_TAXONOMY } from "@/constants/blogTaxonomy";
import {
  apiFetch,
  type Article,
  type TaxonomyCategory,
} from "@/lib/api/client";

const STATUSES = ["", "draft", "submitted", "published", "rejected"] as const;

export default function ArticlesListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [taxonomy, setTaxonomy] = useState<TaxonomyCategory[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const status = searchParams.get("status") || "";
  const categorySlug = searchParams.get("category") || "";
  const subcategorySlug = searchParams.get("subcategory") || "";

  useEffect(() => {
    void (async () => {
      try {
        const data = await apiFetch<{ categories: TaxonomyCategory[] }>(
          "/public/taxonomy",
        );
        setTaxonomy(data.categories);
      } catch {
        setTaxonomy(
          BLOG_TAXONOMY.map((c) => ({
            id: c.slug,
            slug: c.slug,
            label: c.label,
            description: c.description,
            subcategories: c.subcategories.map((s) => ({
              id: s.slug,
              slug: s.slug,
              label: s.label,
            })),
          })),
        );
      }
    })();
  }, []);

  const subcategories = useMemo(() => {
    const cat = taxonomy.find((c) => c.slug === categorySlug);
    return cat?.subcategories ?? [];
  }, [taxonomy, categorySlug]);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (status) params.set("status", status);
        if (categorySlug) params.set("category", categorySlug);
        if (subcategorySlug) params.set("subcategory", subcategorySlug);
        const qs = params.toString();
        const data = await apiFetch<{ articles: Article[] }>(
          `/articles${qs ? `?${qs}` : ""}`,
        );
        setArticles(data.articles);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [status, categorySlug, subcategorySlug]);

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key === "category") next.delete("subcategory");
    setSearchParams(next);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link
          to="/articles/new"
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          New article
        </Link>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <select
          value={status}
          onChange={(e) => setFilter("status", e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          {STATUSES.map((s) => (
            <option key={s || "all"} value={s}>
              {s ? s : "All statuses"}
            </option>
          ))}
        </select>
        <select
          value={categorySlug}
          onChange={(e) => setFilter("category", e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">All categories</option>
          {taxonomy.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
        <select
          value={subcategorySlug}
          onChange={(e) => setFilter("subcategory", e.target.value)}
          disabled={!categorySlug}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm disabled:opacity-50"
        >
          <option value="">All subcategories</option>
          {subcategories.map((s) => (
            <option key={s.id} value={s.slug}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {loading ? (
        <p className="mt-8 text-slate-500">Loading…</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Taxonomy</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No articles yet.
                  </td>
                </tr>
              ) : (
                articles.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <Link
                        to={`/articles/${a.id}`}
                        className="font-medium text-sky-700 hover:underline"
                      >
                        {a.title || "Untitled"}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">
                      {a.articleNumber ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {a.categoryLabel || "—"}
                      {a.subcategoryLabel ? ` / ${a.subcategoryLabel}` : ""}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold capitalize">
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{a.views}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(a.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
