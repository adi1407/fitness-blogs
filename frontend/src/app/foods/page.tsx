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

      <section className="article-body mt-14 max-w-3xl">
        <h2>How to use the food database</h2>
        <ol>
          <li>
            <strong>Find a food</strong> in the{" "}
            <Link href="/foods/indian">Indian foods list</Link> — filter by
            category, vegetarian or non-vegetarian, or sort by protein.
          </li>
          <li>
            <strong>Pick your portion.</strong> Each food page shows values per
            100 g and per common serving such as a katori, a roti or one egg,
            and the serving calculator works out any amount.
          </li>
          <li>
            <strong>Compare and plan.</strong> Use the{" "}
            <Link href="/foods/indian/protein-ranking">protein ranking</Link>{" "}
            to find foods that give the most protein for their calories, then
            build meals that fit the targets from the{" "}
            <Link href="/calorie-calculator">calorie calculator</Link>.
          </li>
        </ol>

        <h2>Where the numbers come from</h2>
        <p>
          Values come from the Indian Food Composition Tables (IFCT 2017),
          published by the ICMR–National Institute of Nutrition and based on
          laboratory analysis of foods grown and sold in India. That makes them
          a better match for Indian staples — dals, millets, rice varieties,
          paneer — than databases built on Western foods.
        </p>
        <p>
          Raw and cooked weights differ. Grains and pulses are listed dry
          (uncooked) unless a page says otherwise, because water added in
          cooking changes the weight but not the calories. Weighing food raw
          gives the most consistent numbers.
        </p>

        <h2>Tips for accurate tracking</h2>
        <ul>
          <li>
            Count cooking oil and ghee separately — one tablespoon of oil is
            about 120 kcal.
          </li>
          <li>
            Weigh a few of your usual portions once; after that, you can
            estimate them with a katori or spoon.
          </li>
          <li>
            Home-cooked dishes vary, so treat every number as a close estimate
            rather than an exact figure.
          </li>
        </ul>
        <p>
          Looking for meal ideas? Our <Link href="/recipes">recipes</Link> list
          ingredients in grams with macros calculated from the same data.
        </p>
      </section>
    </main>
  );
}
