import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/seo";
import Link from "next/link";
import { fetchFoodsSafe } from "@/features/foods/api/foods";
import { forGrams, formatG, proteinPer100Kcal, shortName } from "@/features/foods/lib/nutrition";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Food Calories & Macros Database — Indian Foods",
  description:
    "Look up calories, protein, carbs and fat for Indian foods per serving and per 100 g, with values from IFCT 2017. Find high-protein and low-calorie foods fast.",
  alternates: { canonical: "/foods" },
  openGraph: {
    ...OG_DEFAULTS,
    title: "Food Calories & Macros Database | fitlives",
    description: "Calories and macros for Indian foods per katori, roti and 100 g.",
    url: "/foods",
  },
};

const collections = [
  {
    href: "/foods/indian",
    title: "Indian foods",
    text: "Dal, roti, rice, paneer, eggs, fruit and more — filter by diet, category or protein.",
  },
  {
    href: "/protein-calculator",
    title: "Protein calculator",
    text: "Find your daily protein target, then pick foods to reach it.",
  },
  {
    href: "/macro-calculator",
    title: "Macro calculator",
    text: "Split your calories into protein, carbs and fat.",
  },
  {
    href: "/nutrition/protein",
    title: "Protein guide",
    text: "How much protein you need and the best ways to get it.",
  },
];

export default async function FoodsPage() {
  const foods = await fetchFoodsSafe();
  const topProtein = [...foods].sort((a, b) => proteinPer100Kcal(b) - proteinPer100Kcal(a)).slice(0, 6);

  return (
    <main className="fk-page flex-1 py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="fk-link-muted">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Foods</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Foods database</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Calories and macros for everyday foods, measured the way you eat them — per katori, roti or piece, and per
        100 g. Every value is traceable to the Indian Food Composition Tables (IFCT 2017).
      </p>

      {topProtein.length > 0 && (
        <section className="mt-10" aria-labelledby="top-protein-heading">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="top-protein-heading" className="text-2xl font-semibold">
              Most protein per calorie
            </h2>
            <Link href="/foods/indian" className="text-sm font-medium underline hover:text-[#FF9800]">
              See all {foods.length} foods
            </Link>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topProtein.map((f) => {
              const n = f.defaultServing ? forGrams(f, f.defaultServing.grams) : null;
              return (
                <li key={f.slug}>
                  <Link
                    href={`/foods/${f.slug}`}
                    className="block h-full rounded-xl border border-border bg-white p-4 transition-colors hover:border-[#FF9800] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800]"
                  >
                    <h3 className="font-semibold">{shortName(f.name)}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {n && f.defaultServing
                        ? `${formatG(n.proteinG)} protein · ${n.kcal} kcal per ${f.defaultServing.label}`
                        : `${formatG(f.proteinG)} protein · ${f.kcal} kcal per 100 g`}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {collections.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block h-full rounded-xl border border-border bg-card p-5 hover:border-accent hover:bg-accent-soft/40"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
