"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/openpanel";
import { DIET_LABEL, type FoodDiet } from "@/features/foods/types";
import { formatG, shortName } from "@/features/foods/lib/nutrition";
import {
  RANKING_SORT_LABEL,
  rankBy,
  type RankedFood,
  type RankingSort,
} from "@/features/foods/lib/proteinRanking";

const DIETS: FoodDiet[] = ["veg", "egg", "non-veg"];
const SORTS = Object.keys(RANKING_SORT_LABEL) as RankingSort[];

const chip =
  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800]";
const chipOn = "border-[#0A0A0A] bg-[#0A0A0A] text-white";
const chipOff = "border-border bg-white text-foreground hover:border-[#FF9800]";

export function ProteinRankingTable({ foods }: { foods: RankedFood[] }) {
  const [sort, setSort] = useState<RankingSort>("serving");
  const [diet, setDiet] = useState<FoodDiet | null>(null);
  const rows = useMemo(() => rankBy([...foods], sort, diet), [foods, sort, diet]);

  return (
    <section aria-labelledby="ranking-heading" className="mt-12">
      <h2 id="ranking-heading" className="text-2xl font-semibold">
        The full ranking
      </h2>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Rank by">
        {SORTS.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={sort === s}
            onClick={() => {
              setSort(s);
              trackEvent("protein_ranking_sort", { sort: s });
            }}
            className={`${chip} ${sort === s ? chipOn : chipOff}`}
          >
            {RANKING_SORT_LABEL[s]}
          </button>
        ))}
        <span className="mx-1 hidden w-px self-stretch bg-border sm:block" aria-hidden="true" />
        {DIETS.map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={diet === d}
            onClick={() => {
              setDiet(diet === d ? null : d);
              trackEvent("protein_ranking_diet", { diet: d });
            }}
            className={`${chip} ${diet === d ? chipOn : chipOff}`}
          >
            {DIET_LABEL[d]}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
        {rows.length} foods ranked by protein {RANKING_SORT_LABEL[sort].toLowerCase()}
        {diet ? ` · ${DIET_LABEL[diet]} only` : ""}
      </p>

      <div className="mt-3 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-[#F5F5F5] text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th scope="col" className="px-3 py-2.5">#</th>
              <th scope="col" className="px-3 py-2.5">Food</th>
              <th scope="col" className="px-3 py-2.5">Typical serving</th>
              <SortableTh active={sort === "serving"}>Protein / serving</SortableTh>
              <th scope="col" className="px-3 py-2.5 text-right">kcal / serving</th>
              <SortableTh active={sort === "calorie"}>Protein / 100 kcal</SortableTh>
              <SortableTh active={sort === "weight"}>Protein / 100 g</SortableTh>
            </tr>
          </thead>
          <tbody>
            {rows.map((f, i) => (
              <tr key={f.slug} className="border-t border-border">
                <td className="px-3 py-2.5 tabular-nums text-muted-foreground">{i + 1}</td>
                <th scope="row" className="px-3 py-2.5 font-medium">
                  <Link href={`/foods/${f.slug}`} className="hover:underline">
                    {shortName(f.name)}
                  </Link>
                  <span className="ml-2 text-xs font-normal text-muted-foreground">{DIET_LABEL[f.diet]}</span>
                </th>
                <td className="px-3 py-2.5 text-muted-foreground">{f.servingLabel}</td>
                <td className={cellClass(sort === "serving")}>{formatG(f.servingProteinG)}</td>
                <td className="px-3 py-2.5 text-right tabular-nums">{f.servingKcal}</td>
                <td className={cellClass(sort === "calorie")}>{formatG(f.per100KcalG)}</td>
                <td className={cellClass(sort === "weight")}>{formatG(f.per100gG)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SortableTh({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <th
      scope="col"
      aria-sort={active ? "descending" : undefined}
      className={`px-3 py-2.5 text-right ${active ? "text-foreground" : ""}`}
    >
      {children}
    </th>
  );
}

function cellClass(active: boolean) {
  return `px-3 py-2.5 text-right tabular-nums ${active ? "font-semibold" : ""}`;
}
