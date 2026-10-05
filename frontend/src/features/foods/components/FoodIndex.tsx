"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics/openpanel";
import {
  DIET_LABEL,
  FOOD_CATEGORY_LABEL,
  type FoodDiet,
  type FoodSummary,
} from "@/features/foods/types";
import {
  forGrams,
  formatG,
  isHighProtein,
  isLowCalorie,
  proteinPer100Kcal,
  shortName,
} from "@/features/foods/lib/nutrition";

type Sort = "protein-density" | "kcal-asc" | "name";

const SORT_LABEL: Record<Sort, string> = {
  "protein-density": "Most protein per calorie",
  "kcal-asc": "Lowest calories",
  name: "A–Z",
};

const DIETS: FoodDiet[] = ["veg", "egg", "non-veg"];

const chip =
  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800]";
const chipOn = "border-[#0A0A0A] bg-[#0A0A0A] text-white";
const chipOff = "border-border bg-white text-foreground hover:border-[#FF9800]";

export function FoodIndex({ foods }: { foods: FoodSummary[] }) {
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState<FoodDiet | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [highProtein, setHighProtein] = useState(false);
  const [lowCalorie, setLowCalorie] = useState(false);
  const [sort, setSort] = useState<Sort>("protein-density");
  const deferredQuery = useDeferredValue(query);

  const categories = useMemo(
    () => Object.keys(FOOD_CATEGORY_LABEL).filter((c) => foods.some((f) => f.category === c)),
    [foods],
  );

  const visible = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const list = foods.filter((f) => {
      if (diet && f.diet !== diet) return false;
      if (category && f.category !== category) return false;
      if (highProtein && !isHighProtein(f)) return false;
      if (lowCalorie && !isLowCalorie(f)) return false;
      if (q && !`${f.name} ${f.hindiName} ${f.slug.replace(/-/g, " ")}`.toLowerCase().includes(q)) return false;
      return true;
    });
    return list.sort((a, b) => {
      if (sort === "kcal-asc") return a.kcal - b.kcal;
      if (sort === "name") return a.name.localeCompare(b.name);
      return proteinPer100Kcal(b) - proteinPer100Kcal(a);
    });
  }, [foods, deferredQuery, diet, category, highProtein, lowCalorie, sort]);

  const filtersActive = Boolean(query || diet || category || highProtein || lowCalorie);

  function track(filter: string, value: string | boolean) {
    trackEvent("food_filter", { filter, value: String(value) });
  }

  function reset() {
    setQuery("");
    setDiet(null);
    setCategory(null);
    setHighProtein(false);
    setLowCalorie(false);
  }

  return (
    <section aria-labelledby="food-index-heading" className="mt-10">
      <h2 id="food-index-heading" className="sr-only">
        Food list
      </h2>

      <div className="space-y-4 rounded-2xl border border-border bg-[#F5F5F5] p-4 sm:p-5">
        <label className="block">
          <span className="sr-only">Search foods</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => query.trim() && track("search", query.trim().toLowerCase())}
            placeholder="Search paneer, dal, roti, banana…"
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base outline-none focus:border-[#FF9800] focus:ring-2 focus:ring-[#FF9800]/30"
            autoComplete="off"
          />
        </label>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Diet">
          {DIETS.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={diet === d}
              onClick={() => {
                setDiet(diet === d ? null : d);
                track("diet", d);
              }}
              className={`${chip} ${diet === d ? chipOn : chipOff}`}
            >
              {DIET_LABEL[d]}
            </button>
          ))}
          <span className="mx-1 hidden w-px self-stretch bg-border sm:block" aria-hidden="true" />
          <button
            type="button"
            aria-pressed={highProtein}
            onClick={() => {
              setHighProtein(!highProtein);
              track("high_protein", !highProtein);
            }}
            className={`${chip} ${highProtein ? chipOn : chipOff}`}
          >
            High protein
          </button>
          <button
            type="button"
            aria-pressed={lowCalorie}
            onClick={() => {
              setLowCalorie(!lowCalorie);
              track("low_calorie", !lowCalorie);
            }}
            className={`${chip} ${lowCalorie ? chipOn : chipOff}`}
          >
            Low calorie
          </button>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
          <button
            type="button"
            aria-pressed={category === null}
            onClick={() => setCategory(null)}
            className={`${chip} ${category === null ? chipOn : chipOff}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => {
                setCategory(category === c ? null : c);
                track("category", c);
              }}
              className={`${chip} ${category === c ? chipOn : chipOff}`}
            >
              {FOOD_CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {visible.length} {visible.length === 1 ? "food" : "foods"}
          {filtersActive && (
            <>
              {" · "}
              <button type="button" onClick={reset} className="font-medium text-foreground underline">
                Clear filters
              </button>
            </>
          )}
        </p>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-lg border border-border bg-white px-3 py-1.5 focus:border-[#FF9800] focus:outline-none focus:ring-2 focus:ring-[#FF9800]/30"
          >
            {(Object.keys(SORT_LABEL) as Sort[]).map((s) => (
              <option key={s} value={s}>
                {SORT_LABEL[s]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
          No foods match those filters yet.
        </p>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((f) => (
            <li key={f.slug}>
              <FoodIndexCard food={f} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function FoodIndexCard({ food }: { food: FoodSummary }) {
  const serving = food.defaultServing;
  const n = serving ? forGrams(food, serving.grams) : null;
  return (
    <Link
      href={`/foods/${food.slug}`}
      className="group flex h-full flex-col rounded-xl border border-border bg-white p-4 transition-colors hover:border-[#FF9800] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug group-hover:underline">{shortName(food.name)}</h3>
          {food.hindiName && (
            <p className="text-sm text-muted-foreground" lang="hi">
              {food.hindiName}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
            food.diet === "veg"
              ? "bg-[#F5F5F5] text-foreground"
              : food.diet === "egg"
                ? "bg-[#FF9800]/15 text-foreground"
                : "bg-[#0A0A0A] text-white"
          }`}
        >
          {DIET_LABEL[food.diet]}
        </span>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-[#F5F5F5] px-2 py-1.5">
          <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">kcal</dt>
          <dd className="font-semibold tabular-nums">{n ? n.kcal : food.kcal}</dd>
        </div>
        <div className="rounded-lg bg-[#F5F5F5] px-2 py-1.5">
          <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">Protein</dt>
          <dd className="font-semibold tabular-nums">{formatG(n ? n.proteinG : food.proteinG)}</dd>
        </div>
        <div className="rounded-lg bg-[#F5F5F5] px-2 py-1.5">
          <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">Carbs</dt>
          <dd className="font-semibold tabular-nums">{formatG(n ? n.carbsG : food.carbsG)}</dd>
        </div>
      </dl>
      <p className="mt-2 text-xs text-muted-foreground">
        {serving ? `Per ${serving.label}` : `Per 100 g (${food.basisLabel})`}
      </p>
    </Link>
  );
}
