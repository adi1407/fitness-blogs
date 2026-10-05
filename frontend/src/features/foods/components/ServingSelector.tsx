"use client";

import { useId, useState } from "react";
import { trackEvent } from "@/lib/analytics/openpanel";
import { MacroSplitBar } from "@/features/foods/components/MacroSplitBar";
import { forGrams, formatG } from "@/features/foods/lib/nutrition";
import type { Food } from "@/features/foods/types";
import { cn } from "@/lib/utils";

const CUSTOM = -1;

type Props = Pick<Food, "slug" | "kcal" | "proteinG" | "carbsG" | "fatG" | "fiberG" | "servings" | "basisLabel">;

/** Pick a serving (or type grams) and see the nutrition for that amount. */
export function ServingSelector({ slug, servings, basisLabel, ...per100 }: Props) {
  const [index, setIndex] = useState(0);
  const [custom, setCustom] = useState("150");
  const inputId = useId();

  const customGrams = Number(custom);
  const validCustom = Number.isFinite(customGrams) && customGrams > 0 && customGrams <= 2000;
  const grams = index === CUSTOM ? (validCustom ? customGrams : 0) : (servings[index]?.grams ?? 100);
  const label = index === CUSTOM ? `${validCustom ? customGrams : "–"} g` : (servings[index]?.label ?? "100 g");
  const n = forGrams(per100, grams);

  function choose(i: number) {
    if (i === index) return;
    setIndex(i);
    trackEvent("food_serving_change", {
      food: slug,
      serving: i === CUSTOM ? "custom" : (servings[i]?.label ?? ""),
    });
  }

  const rows: [string, string][] = [
    ["Calories", `${n.kcal} kcal`],
    ["Protein", formatG(n.proteinG)],
    ["Carbohydrates", formatG(n.carbsG)],
    ["Fat", formatG(n.fatG)],
    ["Fibre", formatG(n.fiberG)],
  ];

  return (
    <section aria-labelledby={`${inputId}-h`} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h2 id={`${inputId}-h`} className="text-xl font-semibold tracking-tight">
        Nutrition per serving
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">Choose a serving size. Values are for {basisLabel}.</p>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Serving size">
        {servings.map((s, i) => (
          <button
            key={s.label}
            type="button"
            aria-pressed={index === i}
            onClick={() => choose(i)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none",
              index === i ? "border-[#0A0A0A] bg-[#0A0A0A] text-white" : "border-border bg-white hover:border-[#0A0A0A]/40",
            )}
          >
            {s.label}
          </button>
        ))}
        <button
          type="button"
          aria-pressed={index === CUSTOM}
          onClick={() => choose(CUSTOM)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none",
            index === CUSTOM ? "border-[#0A0A0A] bg-[#0A0A0A] text-white" : "border-border bg-white hover:border-[#0A0A0A]/40",
          )}
        >
          Custom grams
        </button>
      </div>

      {index === CUSTOM ? (
        <div className="mt-3 flex items-center gap-2">
          <label htmlFor={inputId} className="text-sm font-medium">
            Amount
          </label>
          <input
            id={inputId}
            type="number"
            inputMode="decimal"
            min={1}
            max={2000}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="w-28 rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-accent/30"
          />
          <span className="text-sm text-muted-foreground">grams</span>
          {!validCustom ? <span className="text-xs text-red-700">Enter 1–2000 g</span> : null}
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-start">
        <div className="rounded-xl bg-brand-50 p-5" aria-live="polite">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight">
            {n.kcal}
            <span className="ml-2 text-base font-medium text-muted-foreground">kcal</span>
          </p>
          <p className="mt-2 text-sm text-foreground/80">
            {formatG(n.proteinG)} protein · {formatG(n.carbsG)} carbs · {formatG(n.fatG)} fat
          </p>
        </div>
        <div>
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Nutrition for {label}</caption>
            <tbody className="divide-y divide-border">
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row" className="py-2 font-medium text-foreground">
                    {k}
                  </th>
                  <td className="py-2 text-right tabular-nums text-foreground/80">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <MacroSplitBar {...per100} />
          </div>
        </div>
      </div>
    </section>
  );
}
