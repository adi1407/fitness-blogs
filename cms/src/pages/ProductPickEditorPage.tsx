import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductPickPlacementsPanel } from "@/components/ProductPickPlacementsPanel";
import {
  apiFetch,
  type CmsProductPick,
  type ProductPickCategory,
  type ProductPickPlacement,
} from "@/lib/api/client";

const CATEGORIES: { id: ProductPickCategory; label: string }[] = [
  { id: "protein", label: "Protein powder" },
  { id: "creatine", label: "Creatine" },
  { id: "scale", label: "Kitchen / body scale" },
  { id: "tracker", label: "Step counter / fitness band" },
  { id: "equipment", label: "Training equipment" },
  { id: "hydration", label: "Water bottle / hydration" },
  { id: "other", label: "Other" },
];

const empty = {
  name: "",
  brand: "",
  category: "protein" as ProductPickCategory,
  url: "",
  retailer: "",
  whyPick: "",
  notFor: "",
  priceRange: "",
  isAffiliate: false,
  status: "draft" as CmsProductPick["status"],
  sortOrder: 0,
  placements: [] as ProductPickPlacement[],
};

const field = "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm";

export default function ProductPickEditorPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    if (isNew) return;
    void apiFetch<{ pick: CmsProductPick }>(`/product-picks/${id}`)
      .then(({ pick }) =>
        setForm({
          name: pick.name,
          brand: pick.brand,
          category: pick.category,
          url: pick.url,
          retailer: pick.retailer,
          whyPick: pick.whyPick,
          notFor: pick.notFor,
          priceRange: pick.priceRange,
          isAffiliate: pick.isAffiliate,
          status: pick.status,
          sortOrder: pick.sortOrder,
          placements: pick.placements,
        }),
      )
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load"),
      )
      .finally(() => setLoading(false));
  }, [id, isNew]);

  async function save(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setWarnings([]);
    if (!/^https:\/\//.test(form.url.trim())) {
      setError("Link must start with https://");
      return;
    }
    setSaving(true);
    try {
      const data = await apiFetch<{ pick: CmsProductPick; warnings?: string[] }>(
        isNew ? "/product-picks" : `/product-picks/${id}`,
        {
          method: isNew ? "POST" : "PATCH",
          body: JSON.stringify({ ...form, url: form.url.trim() }),
        },
      );
      setWarnings(data.warnings ?? []);
      setMessage("Saved.");
      if (isNew) navigate(`/product-picks/${data.pick.id}`, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (isNew || !id) return;
    if (!confirm("Delete this product pick? It disappears from every page.")) return;
    await apiFetch(`/product-picks/${id}`, { method: "DELETE" });
    navigate("/product-picks");
  }

  if (loading) return <p className="text-slate-600">Loading…</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/product-picks" className="text-sm text-sky-700 hover:underline">
            ← Product picks
          </Link>
          <h1 className="mt-1 text-2xl font-bold">
            {isNew ? "New product pick" : "Edit product pick"}
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
      {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}
      {warnings.map((w) => (
        <p key={w} className="mt-2 text-sm text-amber-700">
          {w}
        </p>
      ))}

      <form onSubmit={(e) => void save(e)} className="mt-6 grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Product name
            <input
              required
              maxLength={120}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={field}
              placeholder="Gold Standard 100% Whey"
            />
          </label>
          <label className="text-sm font-medium">
            Brand
            <input
              maxLength={80}
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className={field}
            />
          </label>
          <label className="text-sm font-medium">
            Category
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as ProductPickCategory })
              }
              className={field}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Status
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as CmsProductPick["status"] })
              }
              className={field}
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
            </select>
          </label>
          <label className="text-sm font-medium sm:col-span-2">
            Link (https)
            <input
              required
              type="url"
              maxLength={500}
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className={`${field} font-mono`}
              placeholder="https://"
            />
          </label>
          <label className="text-sm font-medium">
            Shop / retailer label
            <input
              maxLength={60}
              value={form.retailer}
              onChange={(e) => setForm({ ...form, retailer: e.target.value })}
              className={field}
              placeholder="Brand site, Amazon…"
            />
          </label>
          <label className="text-sm font-medium">
            Price range
            <input
              maxLength={80}
              value={form.priceRange}
              onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
              className={field}
              placeholder="About ₹2,000–3,000 per kg"
            />
          </label>
        </div>

        <label className="text-sm font-medium">
          Why we&apos;d pick it ({form.whyPick.length}/300)
          <textarea
            rows={3}
            maxLength={300}
            value={form.whyPick}
            onChange={(e) => setForm({ ...form, whyPick: e.target.value })}
            className={field}
            placeholder="About 24 g protein per scoop, third-party tested, mixes easily."
          />
        </label>
        <label className="text-sm font-medium">
          Not for ({form.notFor.length}/200)
          <textarea
            rows={2}
            maxLength={200}
            value={form.notFor}
            onChange={(e) => setForm({ ...form, notFor: e.target.value })}
            className={field}
            placeholder="People with a milk allergy, kidney disease, or under 18."
          />
        </label>
        <p className="-mt-2 text-xs text-slate-500">
          No health claims: never say a product treats, cures or prevents
          anything. Recommend on quality signals (testing, protein per serving,
          ingredients).
        </p>

        <label className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-sm">
          <input
            type="checkbox"
            checked={form.isAffiliate}
            onChange={(e) => setForm({ ...form, isAffiliate: e.target.checked })}
            className="mt-0.5"
          />
          <span>
            <span className="font-semibold">Affiliate link</span> — we earn a
            commission from this link.
            <span className="mt-1 block text-xs text-amber-800">
              Only tick after joining an affiliate program and updating the
              Affiliate Disclosure page. The site then labels the link and adds
              the disclosure automatically.
            </span>
          </span>
        </label>

        <ProductPickPlacementsPanel
          placements={form.placements}
          onChange={(placements) => setForm({ ...form, placements })}
        />

        <button
          type="submit"
          disabled={saving}
          className="w-fit rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
}
