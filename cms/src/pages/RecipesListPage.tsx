import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, type CmsRecipe } from "@/lib/api/client";

function needsPhoto(r: CmsRecipe): boolean {
  return !/^https:\/\//.test(r.imageUrl ?? "");
}

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

  const photoGaps = useMemo(
    () => recipes.filter((r) => needsPhoto(r) || !r.imageAlt?.trim()),
    [recipes],
  );
  const airFryerGaps = useMemo(
    () =>
      photoGaps.filter((r) =>
        (r.cuisineTags ?? []).includes("air-fryer"),
      ),
    [photoGaps],
  );

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

      {photoGaps.length > 0 ? (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          <p className="font-semibold">
            {photoGaps.length} recipe{photoGaps.length === 1 ? "" : "s"} need a
            HTTPS photo (and alt) before Google Recipe rich results.
          </p>
          <p className="mt-1 text-amber-900/80">
            Upload the image in the editor, then turn on{" "}
            <strong>robots index</strong> for air-fryer seeds that were seeded
            noindex until photos landed
            {airFryerGaps.length
              ? ` (${airFryerGaps.length} air-fryer)`
              : ""}
            .
          </p>
        </div>
      ) : null}

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
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Index</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recipes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No recipes yet.
                </td>
              </tr>
            ) : (
              recipes.map((r) => {
                const missingPhoto = needsPhoto(r) || !r.imageAlt?.trim();
                return (
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
                      {(r.cuisineTags ?? []).includes("air-fryer") ? (
                        <div className="mt-0.5 text-xs font-medium text-slate-500">
                          air-fryer
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      {r.proteinG != null ? `${r.proteinG}g` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {missingPhoto ? (
                        <span className="font-medium text-amber-700">Needed</span>
                      ) : (
                        <span className="text-slate-600">OK</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {r.robotsIndex ? "yes" : "no"}
                    </td>
                    <td className="px-4 py-3">{r.status}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
