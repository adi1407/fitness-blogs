import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, type CmsRecipe } from "@/lib/api/client";

export default function RecipesListPage() {
  const [recipes, setRecipes] = useState<CmsRecipe[]>([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const qs = status ? `?status=${status}` : "";
    const data = await apiFetch<{ recipes: CmsRecipe[] }>(`/recipes${qs}`);
    setRecipes(data.recipes);
  }

  useEffect(() => {
    void load().catch((err) =>
      setError(err instanceof Error ? err.message : "Failed to load"),
    );
  }, [status]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Recipes</h1>
          <p className="mt-1 text-slate-600">
            High-protein, calorie-aware meals with macros.
          </p>
        </div>
        <Link
          to="/recipes/new"
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          New recipe
        </Link>
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option value="">All statuses</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Protein</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recipes.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                  No recipes yet.
                </td>
              </tr>
            ) : (
              recipes.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link
                      to={`/recipes/${r.id}`}
                      className="font-medium text-sky-700 hover:underline"
                    >
                      {r.title}
                    </Link>
                    <div className="font-mono text-xs text-slate-400">
                      {r.path}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {r.proteinG != null ? `${r.proteinG}g` : "—"}
                  </td>
                  <td className="px-4 py-3">{r.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
