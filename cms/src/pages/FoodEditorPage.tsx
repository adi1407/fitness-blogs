import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FoodRelatedSlugsPanel } from "@/components/FoodRelatedSlugsPanel";
import { ImageUrlUploadField } from "@/components/ImageUrlUploadField";
import { ShareCaptionPanel } from "@/components/ShareCaptionPanel";
import { apiFetch, type CmsFood } from "@/lib/api/client";

const FOOD_CATEGORIES = [
  "pulses",
  "cereals",
  "dairy",
  "eggs",
  "meat-fish",
  "fruits",
  "vegetables",
  "nuts-seeds",
  "fats-sweeteners",
] as const;

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function servingsToText(
  servings: { label: string; grams: number }[],
): string {
  return servings.map((s) => `${s.label}|${s.grams}`).join("\n");
}

function parseServings(value: string): { label: string; grams: number }[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, gramsRaw] = line.split("|").map((s) => s.trim());
      const grams = Number(gramsRaw);
      return { label: label || "serving", grams: Number.isFinite(grams) && grams > 0 ? grams : 100 };
    });
}

const empty = {
  name: "",
  slug: "",
  hindiName: "",
  category: "pulses" as (typeof FOOD_CATEGORIES)[number],
  diet: "veg" as CmsFood["diet"],
  basisLabel: "raw",
  kcal: "",
  proteinG: "",
  carbsG: "",
  fatG: "",
  fiberG: "0",
  calciumMg: "",
  ironMg: "",
  servings: "1 serving|100",
  source: "IFCT 2017" as "IFCT 2017" | "USDA FoodData Central",
  sourceRef: "",
  sourceName: "",
  sourceNote: "",
  intro: "",
  tips: "",
  relatedSlugs: "",
  compareSlug: "",
  imageUrl: "",
  imageAlt: "",
  published: false,
  sortOrder: 0,
};

export default function FoodEditorPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    void apiFetch<{ food: CmsFood }>(`/foods/${id}`)
      .then((data) => {
        const f = data.food;
        setForm({
          name: f.name,
          slug: f.slug,
          hindiName: f.hindiName,
          category: (FOOD_CATEGORIES as readonly string[]).includes(f.category)
            ? (f.category as (typeof FOOD_CATEGORIES)[number])
            : "pulses",
          diet: f.diet,
          basisLabel: f.basisLabel,
          kcal: String(f.kcal),
          proteinG: String(f.proteinG),
          carbsG: String(f.carbsG),
          fatG: String(f.fatG),
          fiberG: String(f.fiberG),
          calciumMg: f.calciumMg != null ? String(f.calciumMg) : "",
          ironMg: f.ironMg != null ? String(f.ironMg) : "",
          servings: servingsToText(f.servings?.length ? f.servings : [{ label: "100 g", grams: 100 }]),
          source:
            f.source === "USDA FoodData Central"
              ? "USDA FoodData Central"
              : "IFCT 2017",
          sourceRef: f.sourceRef,
          sourceName: f.sourceName,
          sourceNote: f.sourceNote,
          intro: f.intro,
          tips: (f.tips ?? []).join("\n"),
          relatedSlugs: (f.relatedSlugs ?? []).join("\n"),
          compareSlug: f.compareSlug ?? "",
          imageUrl: f.imageUrl ?? "",
          imageAlt: f.imageAlt ?? "",
          published: f.published,
          sortOrder: f.sortOrder,
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
    const num = (v: string) => Number(v);
    const optNum = (v: string) => (v.trim() === "" ? null : Number(v));
    const servings = parseServings(form.servings);
    if (servings.length === 0) {
      setError("Add at least one serving as label|grams (e.g. 1 katori|40)");
      return;
    }
    if (form.imageUrl.trim() && !form.imageAlt.trim()) {
      setError("Add alt text describing the photo (e.g. “A katori of cooked moong dal”).");
      return;
    }
    const payload = {
      name: form.name,
      slug: form.slug || null,
      hindiName: form.hindiName,
      category: form.category,
      diet: form.diet,
      basisLabel: form.basisLabel,
      kcal: num(form.kcal),
      proteinG: num(form.proteinG),
      carbsG: num(form.carbsG),
      fatG: num(form.fatG),
      fiberG: num(form.fiberG) || 0,
      calciumMg: optNum(form.calciumMg),
      ironMg: optNum(form.ironMg),
      servings,
      source: form.source,
      sourceRef: form.sourceRef,
      sourceName: form.sourceName,
      sourceNote: form.sourceNote,
      intro: form.intro,
      tips: linesToArray(form.tips),
      relatedSlugs: linesToArray(form.relatedSlugs),
      compareSlug: form.compareSlug.trim() || null,
      imageUrl: form.imageUrl.trim(),
      imageAlt: form.imageAlt.trim(),
      published: form.published,
      sortOrder: Number(form.sortOrder) || 0,
    };
    try {
      if (isNew) {
        const data = await apiFetch<{ food: CmsFood }>("/foods", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setMessage("Created.");
        navigate(`/foods/${data.food.id}`, { replace: true });
      } else {
        await apiFetch(`/foods/${id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        setMessage("Saved. This food is CMS-managed and will not be overwritten by seeds.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }

  async function remove() {
    if (isNew || !id) return;
    if (!confirm("Delete this food?")) return;
    await apiFetch(`/foods/${id}`, { method: "DELETE" });
    navigate("/foods");
  }

  if (loading) return <p className="text-slate-600">Loading…</p>;

  const field =
    "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/foods" className="text-sm text-sky-700 hover:underline">
            ← Foods
          </Link>
          <h1 className="mt-1 text-2xl font-bold">
            {isNew ? "New food" : "Edit food"}
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
            Name
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={field}
            />
          </label>
          <label className="text-sm font-medium">
            Slug
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className={`${field} font-mono`}
            />
          </label>
          <label className="text-sm font-medium">
            Hindi name
            <input
              value={form.hindiName}
              onChange={(e) => setForm({ ...form, hindiName: e.target.value })}
              className={field}
            />
          </label>
          <label className="text-sm font-medium">
            Basis label
            <input
              value={form.basisLabel}
              onChange={(e) => setForm({ ...form, basisLabel: e.target.value })}
              className={field}
              placeholder="raw, boiled, edible portion…"
            />
          </label>
          <label className="text-sm font-medium">
            Category
            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value as (typeof FOOD_CATEGORIES)[number],
                })
              }
              className={field}
            >
              {FOOD_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Diet
            <select
              value={form.diet}
              onChange={(e) =>
                setForm({ ...form, diet: e.target.value as CmsFood["diet"] })
              }
              className={field}
            >
              <option value="veg">veg</option>
              <option value="egg">egg</option>
              <option value="non-veg">non-veg</option>
            </select>
          </label>
        </div>

        <fieldset className="rounded-xl border border-slate-200 p-4">
          <legend className="px-1 text-sm font-semibold">Per 100 g</legend>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {(
              [
                ["kcal", "kcal"],
                ["proteinG", "Protein g"],
                ["carbsG", "Carbs g"],
                ["fatG", "Fat g"],
                ["fiberG", "Fiber g"],
                ["calciumMg", "Calcium mg"],
                ["ironMg", "Iron mg"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="text-sm font-medium">
                {label}
                <input
                  required={!["calciumMg", "ironMg", "fiberG"].includes(key)}
                  type="number"
                  step="any"
                  min={0}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className={field}
                />
              </label>
            ))}
          </div>
        </fieldset>

        <label className="text-sm font-medium">
          Servings (one per line: label|grams)
          <textarea
            required
            rows={3}
            value={form.servings}
            onChange={(e) => setForm({ ...form, servings: e.target.value })}
            className={`${field} font-mono`}
            placeholder={"1 katori cooked|40\n100 g|100"}
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Source
            <select
              value={form.source}
              onChange={(e) =>
                setForm({
                  ...form,
                  source: e.target.value as typeof form.source,
                })
              }
              className={field}
            >
              <option value="IFCT 2017">IFCT 2017</option>
              <option value="USDA FoodData Central">USDA FoodData Central</option>
            </select>
          </label>
          <label className="text-sm font-medium">
            Source ref
            <input
              value={form.sourceRef}
              onChange={(e) => setForm({ ...form, sourceRef: e.target.value })}
              className={field}
              placeholder="L003"
            />
          </label>
          <label className="text-sm font-medium sm:col-span-2">
            Source name
            <input
              value={form.sourceName}
              onChange={(e) => setForm({ ...form, sourceName: e.target.value })}
              className={field}
            />
          </label>
          <label className="text-sm font-medium sm:col-span-2">
            Source note
            <input
              value={form.sourceNote}
              onChange={(e) => setForm({ ...form, sourceNote: e.target.value })}
              className={field}
            />
          </label>
        </div>

        <ImageUrlUploadField
          label="Food photo"
          value={form.imageUrl}
          onChange={(url) => setForm({ ...form, imageUrl: url })}
          hint="Real photo of the food as served, 1600×900 (16:9), JPEG/WebP under 5 MB."
        />
        <label className="text-sm font-medium">
          Photo alt text
          <input
            value={form.imageAlt}
            onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
            className={field}
            maxLength={200}
            placeholder="A katori of cooked moong dal"
          />
        </label>

        <label className="text-sm font-medium">
          Intro
          <textarea
            rows={5}
            value={form.intro}
            onChange={(e) => setForm({ ...form, intro: e.target.value })}
            className={field}
          />
        </label>
        <label className="text-sm font-medium">
          Tips (one per line)
          <textarea
            rows={4}
            value={form.tips}
            onChange={(e) => setForm({ ...form, tips: e.target.value })}
            className={field}
          />
        </label>
        <FoodRelatedSlugsPanel
          relatedSlugs={linesToArray(form.relatedSlugs)}
          excludeSlug={form.slug || undefined}
          onChange={(slugs) =>
            setForm({ ...form, relatedSlugs: slugs.join("\n") })
          }
        />
        <ShareCaptionPanel
          title={form.name}
          path={form.slug ? `/foods/${form.slug}` : null}
          slug={form.slug}
          blurb={form.intro}
        />
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-sm font-medium">
            Compare slug
            <input
              value={form.compareSlug}
              onChange={(e) =>
                setForm({ ...form, compareSlug: e.target.value })
              }
              className={`${field} font-mono`}
            />
          </label>
          <label className="text-sm font-medium">
            Sort order
            <input
              type="number"
              min={0}
              value={form.sortOrder}
              onChange={(e) =>
                setForm({ ...form, sortOrder: Number(e.target.value) || 0 })
              }
              className={field}
            />
          </label>
          <label className="flex items-center gap-2 text-sm font-medium sm:mt-6">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                setForm({ ...form, published: e.target.checked })
              }
            />
            Published
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
