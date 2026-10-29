import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiFetch, type CmsRecipe } from "@/lib/api/client";
import RichTextEditor from "@/components/RichTextEditor";
import { ImageUrlUploadField } from "@/components/ImageUrlUploadField";
import { recipeReadiness } from "@/features/recipes/recipeReadiness";

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

const empty = {
  title: "",
  slug: "",
  excerpt: "",
  quickAnswer: "",
  bodyHtml: "",
  ingredients: "",
  steps: "",
  calories: "",
  proteinG: "",
  carbsG: "",
  fatG: "",
  cuisineTags: "",
  mealType: "",
  metaTitle: "",
  metaDescription: "",
  status: "draft" as CmsRecipe["status"],
  robotsIndex: true,
  sortOrder: 0,
  imageUrl: "",
  imageAlt: "",
  prepMinutes: "",
  cookMinutes: "",
  totalMinutes: "",
  timeNote: "",
  servings: "",
};

const num = (v: string) => (v.trim() === "" ? null : Number(v));
const field = "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2";

export default function RecipeEditorPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    void apiFetch<{ recipe: CmsRecipe }>(`/recipes/${id}`)
      .then((data) => {
        const r = data.recipe;
        setForm({
          title: r.title,
          slug: r.slug,
          excerpt: r.excerpt,
          quickAnswer: r.quickAnswer,
          bodyHtml: r.bodyHtml,
          ingredients: (r.ingredients ?? []).map(String).join("\n"),
          steps: (r.steps ?? []).map(String).join("\n"),
          calories: r.calories != null ? String(r.calories) : "",
          proteinG: r.proteinG != null ? String(r.proteinG) : "",
          carbsG: r.carbsG != null ? String(r.carbsG) : "",
          fatG: r.fatG != null ? String(r.fatG) : "",
          cuisineTags: (r.cuisineTags ?? []).join("\n"),
          mealType: r.mealType,
          metaTitle: r.metaTitle,
          metaDescription: r.metaDescription,
          status: r.status,
          robotsIndex: r.robotsIndex,
          sortOrder: r.sortOrder,
          imageUrl: r.imageUrl ?? "",
          imageAlt: r.imageAlt ?? "",
          prepMinutes: r.prepMinutes != null ? String(r.prepMinutes) : "",
          cookMinutes: r.cookMinutes != null ? String(r.cookMinutes) : "",
          totalMinutes: r.totalMinutes != null ? String(r.totalMinutes) : "",
          timeNote: r.timeNote ?? "",
          servings: r.servings != null ? String(r.servings) : "",
        });
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load"),
      )
      .finally(() => setLoading(false));
  }, [id, isNew]);

  async function save(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (form.status === "published" && !ready) {
      setError("Finish the Google recipe checklist below before publishing, or save as draft.");
      return;
    }
    const payload = {
      title: form.title,
      slug: form.slug || null,
      excerpt: form.excerpt,
      quickAnswer: form.quickAnswer,
      bodyHtml: form.bodyHtml,
      ingredients: linesToArray(form.ingredients),
      steps: linesToArray(form.steps),
      calories: num(form.calories),
      proteinG: num(form.proteinG),
      carbsG: num(form.carbsG),
      fatG: num(form.fatG),
      cuisineTags: linesToArray(form.cuisineTags),
      mealType: form.mealType,
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      status: form.status,
      robotsIndex: form.robotsIndex,
      sortOrder: Number(form.sortOrder) || 0,
      imageUrl: form.imageUrl.trim(),
      imageAlt: form.imageAlt.trim(),
      prepMinutes: num(form.prepMinutes),
      cookMinutes: num(form.cookMinutes),
      totalMinutes: num(form.totalMinutes),
      timeNote: form.timeNote.trim(),
      servings: num(form.servings),
    };
    try {
      if (isNew) {
        const data = await apiFetch<{ recipe: CmsRecipe }>("/recipes", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setMessage("Created.");
        navigate(`/recipes/${data.recipe.id}`, { replace: true });
      } else {
        await apiFetch(`/recipes/${id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        setMessage("Saved.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }

  async function remove() {
    if (isNew || !id) return;
    if (!confirm("Delete this recipe?")) return;
    await apiFetch(`/recipes/${id}`, { method: "DELETE" });
    navigate("/recipes");
  }

  const checks = recipeReadiness({
    imageUrl: form.imageUrl.trim(),
    imageAlt: form.imageAlt,
    prepMinutes: num(form.prepMinutes),
    cookMinutes: num(form.cookMinutes),
    totalMinutes: num(form.totalMinutes),
    servings: num(form.servings),
    calories: num(form.calories),
    proteinG: num(form.proteinG),
    carbsG: num(form.carbsG),
    fatG: num(form.fatG),
    ingredients: linesToArray(form.ingredients),
    steps: linesToArray(form.steps),
    excerpt: form.excerpt,
    metaDescription: form.metaDescription,
  });
  const ready = checks.every((c) => c.ok);

  if (loading) return <p className="text-slate-600">Loading…</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/recipes" className="text-sm text-sky-700 hover:underline">
            ← Recipes
          </Link>
          <h1 className="mt-1 text-2xl font-bold">
            {isNew ? "New recipe" : "Edit recipe"}
          </h1>
        </div>
        {!isNew ? (
          <button
            type="button"
            onClick={() => void remove()}
            className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700"
          >
            Delete
          </button>
        ) : null}
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {message ? (
        <p className="mt-3 text-sm text-emerald-700">{message}</p>
      ) : null}

      <form onSubmit={(e) => void save(e)} className="mt-6 grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Title
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Slug
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm"
            />
          </label>
          <label className="text-sm font-medium">
            Meal type
            <input
              value={form.mealType}
              onChange={(e) => setForm({ ...form, mealType: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              placeholder="breakfast, lunch-dinner…"
            />
          </label>
          <label className="text-sm font-medium">
            Status
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as CmsRecipe["status"],
                })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
            </select>
          </label>
        </div>

        <label className="text-sm font-medium">
          Excerpt
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="text-sm font-medium">
          Quick answer
          <textarea
            value={form.quickAnswer}
            onChange={(e) => setForm({ ...form, quickAnswer: e.target.value })}
            rows={3}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>

        <div>
          <p className="text-sm font-medium">Body</p>
          <div className="mt-1 rounded-lg border border-slate-200 bg-white p-2">
            <RichTextEditor
              value={form.bodyHtml}
              onChange={(html) => setForm({ ...form, bodyHtml: html })}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Ingredients (one per line)
            <textarea
              value={form.ingredients}
              onChange={(e) =>
                setForm({ ...form, ingredients: e.target.value })
              }
              rows={6}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Steps (one per line)
            <textarea
              value={form.steps}
              onChange={(e) => setForm({ ...form, steps: e.target.value })}
              rows={6}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          {(
            [
              ["calories", "Calories"],
              ["proteinG", "Protein g"],
              ["carbsG", "Carbs g"],
              ["fatG", "Fat g"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="text-sm font-medium">
              {label}
              <input
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              />
            </label>
          ))}
        </div>

        <section className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-900">Photo, time and servings</h2>
          <ImageUrlUploadField
            label="Recipe photo"
            value={form.imageUrl}
            onChange={(url) => setForm({ ...form, imageUrl: url })}
            hint="Real photo of this dish as served, at least 1200 px wide (16:9 works best). Google needs it for the recipe card."
          />
          <label className="text-sm font-medium">
            Photo alt text
            <input
              value={form.imageAlt}
              onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
              className={field}
              maxLength={200}
              placeholder="Paneer bhurji in a steel bowl with two rotis"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-4">
            {(
              [
                ["prepMinutes", "Prep (min)", "Hands-on prep"],
                ["cookMinutes", "Cook (min)", "0 if no cooking"],
                ["totalMinutes", "Total (min)", "Only if there is waiting time"],
                ["servings", "Servings", "Nutrition is per serving"],
              ] as const
            ).map(([key, label, placeholder]) => (
              <label key={key} className="text-sm font-medium">
                {label}
                <input
                  type="number"
                  min={key === "servings" ? 1 : 0}
                  inputMode="numeric"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className={field}
                />
              </label>
            ))}
          </div>
          <label className="text-sm font-medium">
            Time note (optional)
            <input
              value={form.timeNote}
              onChange={(e) => setForm({ ...form, timeNote: e.target.value })}
              className={field}
              maxLength={300}
              placeholder="Total includes soaking the dal for 3–4 hours."
            />
          </label>
        </section>

        <label className="text-sm font-medium">
          Cuisine tags (one per line)
          <textarea
            value={form.cuisineTags}
            onChange={(e) => setForm({ ...form, cuisineTags: e.target.value })}
            rows={2}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Meta title
            <input
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Meta description
            <input
              value={form.metaDescription}
              onChange={(e) =>
                setForm({ ...form, metaDescription: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.robotsIndex}
            onChange={(e) =>
              setForm({ ...form, robotsIndex: e.target.checked })
            }
          />
          Allow search indexing when published
        </label>

        <section
          className={`rounded-xl border p-4 ${ready ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}
          aria-live="polite"
        >
          <h2 className="text-sm font-semibold text-slate-900">
            {ready ? "Ready for Google recipe results" : "Needed before publishing"}
          </h2>
          <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
            {checks.map((c) => (
              <li key={c.label} className={c.ok ? "text-emerald-800" : "text-amber-900"}>
                <span aria-hidden>{c.ok ? "✓" : "○"}</span> {c.label}
                <span className="sr-only">{c.ok ? " (done)" : " (missing)"}</span>
              </li>
            ))}
          </ul>
        </section>

        <button
          type="submit"
          className="w-fit rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          Save
        </button>
      </form>
    </div>
  );
}
