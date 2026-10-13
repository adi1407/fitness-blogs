import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/seo";
import Link from "next/link";
import {
  KnowledgeBreadcrumbs,
  KnowledgeDisclaimer,
} from "@/features/knowledge/components/KnowledgeUi";
import { fetchRecipes } from "@/lib/api/knowledge";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "High-Protein Recipes — Indian-Friendly Meal Ideas",
  description:
    "Calorie-aware, high-protein recipes with macros — paneer, dal, eggs, chicken, and more.",
  alternates: { canonical: "/recipes" },
  openGraph: {
    ...OG_DEFAULTS,
    title: "Recipes | fitlives",
    description: "Practical high-protein meals with honest macros.",
    url: "/recipes",
  },
};

export default async function RecipesPage() {
  const recipes = await fetchRecipes();

  return (
    <main className="fk-page flex-1 py-16">
      <KnowledgeBreadcrumbs
        items={[{ href: "/", label: "Home" }, { label: "Recipes" }]}
      />

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Recipes
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        High-protein, calorie-aware meals you can cook on a weeknight — with
        macros listed so you can plug them into your targets.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/macro-calculator"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Macro calculator
        </Link>
        <Link
          href="/foods/indian"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
        >
          Indian foods hub
        </Link>
      </div>

      {recipes.length === 0 ? (
        <p className="mt-10 text-muted-foreground">Recipes coming soon.</p>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {recipes.map((r) => (
            <li key={r.id}>
              <Link
                href={r.path ?? `/recipes/${r.slug}`}
                className="block h-full rounded-xl border border-border bg-card p-5 hover:border-accent hover:bg-accent-soft/40"
              >
                <h2 className="text-lg font-semibold">{r.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{r.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {r.proteinG != null ? `${r.proteinG}g protein` : null}
                  {r.calories != null
                    ? `${r.proteinG != null ? " · " : ""}${r.calories} kcal`
                    : null}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <section className="article-body mt-14 max-w-3xl">
        <h2>How we calculate the macros</h2>
        <p>
          Every recipe lists its ingredients by weight, and the calories and
          protein are calculated ingredient by ingredient from Indian Food
          Composition Tables (IFCT 2017) values in our{" "}
          <Link href="/foods/indian">Indian food database</Link>. Grains and
          pulses are weighed raw, because cooked weights change with the amount
          of water. Where a food isn&apos;t in IFCT — such as Greek yogurt —
          we use typical label values and say so on the recipe.
        </p>
        <h2>How to use these recipes</h2>
        <ul>
          <li>
            <strong>Start with your targets.</strong> Get a daily calorie and
            protein number from the{" "}
            <Link href="/macro-calculator">macro calculator</Link>, then pick
            meals that fit it.
          </li>
          <li>
            <strong>Adjust the carbs, not the protein.</strong> For fat loss,
            reduce the rice or roti; for muscle gain, add more. Keep the protein
            portion the same.
          </li>
          <li>
            <strong>Measure oil and ghee.</strong> One tablespoon of oil is about
            120 kcal — the easiest place for hidden calories to creep in.
          </li>
          <li>
            <strong>Cook in batches.</strong> Dal, masalas, chilla batter and
            sprouts all keep for 2–3 days in the fridge, so weekday meals take
            minutes.
          </li>
        </ul>
        <h2>Building a high-protein day</h2>
        <p>
          A simple day might be a{" "}
          <Link href="/recipes/moong-chilla-stack">moong dal chilla</Link> or{" "}
          <Link href="/recipes/greek-yogurt-fruit-bowl">Greek yogurt bowl</Link>{" "}
          for breakfast, a{" "}
          <Link href="/recipes/dal-rice-protein-plate">dal-rice plate</Link> for
          lunch, a <Link href="/recipes/sprout-chaat-bowl">sprout chaat</Link>{" "}
          snack, and{" "}
          <Link href="/recipes/paneer-bhurji-high-protein">paneer bhurji</Link>{" "}
          or a{" "}
          <Link href="/recipes/chicken-stir-fry-veggies">chicken stir-fry</Link>{" "}
          for dinner. Together that is roughly 105–120 g of protein. To see which
          foods give the most protein per serving, use our{" "}
          <Link href="/foods/indian/protein-ranking">protein ranking</Link> or
          read the <Link href="/nutrition/protein">protein guide</Link>.
        </p>
      </section>

      <KnowledgeDisclaimer />
    </main>
  );
}
