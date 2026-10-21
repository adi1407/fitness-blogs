import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, type CmsProductPick } from "@/lib/api/client";

export default function ProductPicksListPage() {
  const [picks, setPicks] = useState<CmsProductPick[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    void apiFetch<{ picks: CmsProductPick[] }>("/product-picks")
      .then((data) => setPicks(data.picks ?? []))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load"),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Product picks</h1>
          <p className="mt-1 max-w-2xl text-slate-600">
            &ldquo;What we&apos;d use&rdquo; recommendations shown on articles,
            calculators and review pages. Hidden on the live site until{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">
              NEXT_PUBLIC_PRODUCT_PICKS=on
            </code>{" "}
            is set on Vercel; article previews always show them.
          </p>
        </div>
        <Link
          to="/product-picks/new"
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          New pick
        </Link>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Placements</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  Loading…
                </td>
              </tr>
            ) : picks.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No product picks yet.
                </td>
              </tr>
            ) : (
              picks.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link
                      to={`/product-picks/${p.id}`}
                      className="font-medium text-sky-700 hover:underline"
                    >
                      {p.name}
                    </Link>
                    <div className="text-xs text-slate-400">
                      {[p.brand, p.retailer].filter(Boolean).join(" · ")}
                      {p.isAffiliate ? " · affiliate" : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{p.placements.length}</td>
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
