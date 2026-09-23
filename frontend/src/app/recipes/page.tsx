import type { Metadata } from "next";
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
          href="/tools/macro-calculator"
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

      <KnowledgeDisclaimer />
    </main>
  );
}
