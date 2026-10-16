import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, type CmsFood } from "@/lib/api/client";

export default function FoodsListPage() {
  const [foods, setFoods] = useState<CmsFood[]>([]);
  const [published, setPublished] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const qs = published ? `?published=${published}` : "";
    const data = await apiFetch<{ foods: CmsFood[] }>(`/foods${qs}`);
    setFoods(data.foods);
  }

  useEffect(() => {
    void load().catch((err) =>
      setError(err instanceof Error ? err.message : "Failed to load"),
    );
  }, [published]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Foods</h1>
          <p className="mt-1 text-slate-600">
            Nutrition pages under /foods — IFCT / USDA macros and servings.
          </p>
        </div>
        <Link
          to="/foods/new"
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          New food
        </Link>
      </div>

      <select
        value={published}
        onChange={(e) => setPublished(e.target.value)}
        className="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option value="">All</option>
        <option value="true">Published</option>
        <option value="false">Unpublished</option>
      </select>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Macros / 100 g</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {foods.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No foods yet.
                </td>
              </tr>
            ) : (
              foods.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link
                      to={`/foods/${f.id}`}
                      className="font-medium text-sky-700 hover:underline"
                    >
                      {f.name}
                    </Link>
                    <div className="font-mono text-xs text-slate-400">
                      {f.path}
                      {f.managedBy === "cms" ? " · cms" : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {f.category}
                    <div className="text-xs text-slate-400">{f.diet}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {f.kcal} kcal · P {f.proteinG}g · C {f.carbsG}g · F {f.fatG}g
                  </td>
                  <td className="px-4 py-3">
                    {f.published ? "published" : "draft"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
