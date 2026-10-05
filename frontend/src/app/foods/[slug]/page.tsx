import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/features/shared/components/FaqAccordion";
import { fetchFood, fetchFoodsSafe } from "@/features/foods/api/foods";
import { FoodViewBeacon } from "@/features/foods/components/FoodViewBeacon";
import { ServingSelector } from "@/features/foods/components/ServingSelector";
import {
  forGrams,
  formatG,
  goalNotes,
  isHighProtein,
  proteinPer100Kcal,
  servingNoun,
  shortName,
} from "@/features/foods/lib/nutrition";
import { DIET_LABEL, FOOD_CATEGORY_LABEL, type Food, type FoodSummary } from "@/features/foods/types";
import { ARTICLES, CALCULATORS, type LinkItem } from "@/features/tools/content/links";
import { BRAND_NAME } from "@/lib/brand";
import { ogImageUrl } from "@/lib/og/url";
import { getPublicSiteUrl } from "@/lib/siteUrl";

export const revalidate = 3600;

type Params = { slug: string };

const IFCT_URL = "https://www.nin.res.in/ebooks/IFCT2017.pdf";

const CATEGORY_ARTICLES: Record<string, LinkItem[]> = {
  pulses: [ARTICLES.indianProteinFoods, ARTICLES.proteinPerDay, ARTICLES.indianWeightLossFoods],
  dairy: [ARTICLES.indianProteinFoods, ARTICLES.proteinPerDay, ARTICLES.proteinMuscle],
  eggs: [ARTICLES.indianProteinFoods, ARTICLES.proteinMuscle, ARTICLES.beginnerGymDiet],
  "meat-fish": [ARTICLES.proteinMuscle, ARTICLES.indianProteinFoods, ARTICLES.beginnerGymDiet],
  cereals: [ARTICLES.riceVsRoti, ARTICLES.indianWeightLossFoods, ARTICLES.caloriesToLoseWeight],
  fruits: [ARTICLES.indianWeightLossFoods, ARTICLES.caloriesToLoseWeight, ARTICLES.bellyFat],
  vegetables: [ARTICLES.indianWeightLossFoods, ARTICLES.caloriesToLoseWeight, ARTICLES.bellyFat],
  "nuts-seeds": [ARTICLES.indianProteinFoods, ARTICLES.indianWeightLossFoods, ARTICLES.calorieDeficit],
  "fats-sweeteners": [ARTICLES.indianWeightLossFoods, ARTICLES.calorieDeficit, ARTICLES.caloriesToLoseWeight],
};

export async function generateStaticParams(): Promise<Params[]> {
  const foods = await fetchFoodsSafe();
  return foods.map((f) => ({ slug: f.slug }));
}

function titleFor(food: Food) {
  return `${shortName(food.name)} Calories: Nutrition per ${servingNoun(food.servings[0])} & 100 g`;
}

function quickAnswer(food: Food) {
  const s = food.servings[0];
  const n = forGrams(food, s.grams);
  return { serving: s, n };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchFood(slug).catch(() => null);
  if (!data) return { title: "Food not found", robots: { index: false } };
  const { food } = data;
  const { serving, n } = quickAnswer(food);
  const title = titleFor(food);
  const description = `${shortName(food.name)}, ${serving.label}: about ${n.kcal} kcal and ${formatG(n.proteinG)} protein. Calories, protein, carbs and fat per serving and per 100 g, from ${food.source}.`;
  const image = ogImageUrl({
    title: `${shortName(food.name)} calories`,
    eyebrow: "Indian food database",
    stat: `${n.kcal} kcal`,
    statLabel: serving.label.length <= 30 ? serving.label : `per ${servingNoun(serving).toLowerCase()}`,
  });
  return {
    title,
    description,
    alternates: { canonical: `/foods/${food.slug}` },
    openGraph: {
      title: `${title} | ${BRAND_NAME}`,
      description,
      url: `/foods/${food.slug}`,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: `${food.name} nutrition` }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${BRAND_NAME}`, description, images: [image] },
  };
}

function faqFor(food: Food) {
  const name = shortName(food.name);
  const lower = name.toLowerCase();
  const per100 = forGrams(food, 100);
  const notes = goalNotes(food);
  const items = food.servings
    .filter((s) => !/^100 g/.test(s.label))
    .slice(0, 2)
    .map((s) => {
      const n = forGrams(food, s.grams);
      return {
        question: `How many calories are in ${lower} (${s.label.replace(/\s*\(.*\)$/, "")})?`,
        answer: `${name}, ${s.label}: about ${n.kcal} kcal, with ${formatG(n.proteinG)} protein, ${formatG(n.carbsG)} carbohydrate and ${formatG(n.fatG)} fat.`,
      };
    });
  items.push({
    question: `How much protein is in 100 g of ${lower}?`,
    answer: `100 g of ${food.basisLabel} has about ${formatG(per100.proteinG)} protein and ${per100.kcal} kcal — roughly ${proteinPer100Kcal(food)} g of protein per 100 kcal.`,
  });
  items.push({ question: `Is ${lower} good for weight loss?`, answer: notes.weightLoss });
  items.push({ question: `Is ${lower} good for muscle building?`, answer: notes.muscle });
  return items;
}

function CompareTable({ food, other }: { food: Food; other: Food }) {
  const a = forGrams(food, 100);
  const b = forGrams(other, 100);
  const rows: [string, string, string][] = [
    ["Calories", `${a.kcal} kcal`, `${b.kcal} kcal`],
    ["Protein", formatG(a.proteinG), formatG(b.proteinG)],
    ["Carbs", formatG(a.carbsG), formatG(b.carbsG)],
    ["Fat", formatG(a.fatG), formatG(b.fatG)],
    ["Fibre", formatG(a.fiberG), formatG(b.fiberG)],
    ["Protein per 100 kcal", formatG(proteinPer100Kcal(food)), formatG(proteinPer100Kcal(other))],
  ];
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full border-collapse overflow-hidden rounded-xl border border-border text-left text-sm">
        <caption className="mb-2 text-left text-xs text-muted-foreground">
          Per 100 g ({food.basisLabel} vs {other.basisLabel})
        </caption>
        <thead className="bg-muted/60">
          <tr>
            <th scope="col" className="px-3 py-2.5 font-semibold">
              Nutrient
            </th>
            <th scope="col" className="px-3 py-2.5 font-semibold">
              {shortName(food.name)}
            </th>
            <th scope="col" className="px-3 py-2.5 font-semibold">
              <Link href={`/foods/${other.slug}`} className="fk-link">
                {shortName(other.name)}
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {rows.map(([k, x, y]) => (
            <tr key={k}>
              <th scope="row" className="px-3 py-2.5 font-medium">
                {k}
              </th>
              <td className="px-3 py-2.5 tabular-nums text-foreground/80">{x}</td>
              <td className="px-3 py-2.5 tabular-nums text-foreground/80">{y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FoodCard({ food }: { food: FoodSummary }) {
  const s = food.defaultServing;
  const n = s ? forGrams(food, s.grams) : null;
  return (
    <Link
      href={`/foods/${food.slug}`}
      className="group fk-panel flex h-full flex-col justify-between gap-3 p-4 transition hover:border-[#FF9800] focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none"
    >
      <div>
        <p className="font-semibold">{food.name}</p>
        {s && n ? (
          <p className="mt-1 text-sm text-muted-foreground">
            {s.label}: {n.kcal} kcal · {formatG(n.proteinG)} protein
          </p>
        ) : null}
      </div>
      <span className="text-xs font-medium text-muted-foreground">
        {food.kcal} kcal / 100 g {food.basisLabel.includes("dry") ? "dry" : ""}
      </span>
    </Link>
  );
}

export default async function FoodPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const data = await fetchFood(slug);
  if (!data) notFound();
  const { food, compare, related } = data;

  const siteUrl = getPublicSiteUrl();
  const name = shortName(food.name);
  const { serving, n } = quickAnswer(food);
  const per100 = forGrams(food, 100);
  const notes = goalNotes(food);
  const faq = faqFor(food);
  const highProtein = isHighProtein(food);
  const articles = CATEGORY_ARTICLES[food.category] ?? [];
  const calculators = highProtein
    ? [CALCULATORS.protein, CALCULATORS.macro, CALCULATORS.calorie]
    : [CALCULATORS.calorie, CALCULATORS.deficit, CALCULATORS.macro];
  const updated = new Date(food.updatedAt);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Foods", item: `${siteUrl}/foods` },
      { "@type": "ListItem", position: 3, name: "Indian foods", item: `${siteUrl}/foods/indian` },
      { "@type": "ListItem", position: 4, name: food.name, item: `${siteUrl}/foods/${food.slug}` },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const per100Rows: [string, string][] = [
    ["Calories", `${per100.kcal} kcal`],
    ["Protein", formatG(per100.proteinG)],
    ["Carbohydrates", formatG(per100.carbsG)],
    ["Fat", formatG(per100.fatG)],
    ["Fibre", formatG(per100.fiberG)],
    ...(food.calciumMg != null ? ([["Calcium", `${Math.round(food.calciumMg)} mg`]] as [string, string][]) : []),
    ...(food.ironMg != null ? ([["Iron", `${food.ironMg.toFixed(1)} mg`]] as [string, string][]) : []),
  ];

  return (
    <main className="fk-page flex-1 py-12 sm:py-16">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />
      <FoodViewBeacon slug={food.slug} category={food.category} />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="fk-link-muted">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/foods" className="fk-link-muted">
              Foods
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/foods/indian" className="fk-link-muted">
              Indian foods
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">{food.name}</li>
        </ol>
      </nav>

      <div className="mt-4 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#FF9800]">
          {FOOD_CATEGORY_LABEL[food.category] ?? "Food"} · {DIET_LABEL[food.diet]}
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          {name} calories &amp; nutrition
        </h1>
        {food.hindiName ? (
          <p className="mt-2 text-lg text-muted-foreground" lang="hi">
            {food.hindiName}
          </p>
        ) : null}
      </div>

      <section
        aria-label="Quick answer"
        className="mt-6 max-w-3xl rounded-2xl border-l-4 border-[#FF9800] bg-[#FFF8E1] px-5 py-4"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70">Quick answer</p>
        <p className="mt-1 text-lg leading-relaxed">
          {name}, <strong>{serving.label}</strong>: about <strong>{n.kcal} kcal</strong>, {formatG(n.proteinG)}{" "}
          protein, {formatG(n.carbsG)} carbs and {formatG(n.fatG)} fat. Per 100 g ({food.basisLabel}): {per100.kcal}{" "}
          kcal and {formatG(per100.proteinG)} protein.
        </p>
      </section>

      {food.intro ? <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80">{food.intro}</p> : null}

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-12">
          <ServingSelector
            slug={food.slug}
            servings={food.servings}
            basisLabel={food.basisLabel}
            kcal={food.kcal}
            proteinG={food.proteinG}
            carbsG={food.carbsG}
            fatG={food.fatG}
            fiberG={food.fiberG}
          />

          <section aria-labelledby="per-100g">
            <h2 id="per-100g" className="text-2xl font-semibold tracking-tight">
              Nutrition per 100 g
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">For {food.basisLabel}.</p>
            <table className="mt-4 w-full max-w-md border-collapse overflow-hidden rounded-xl border border-border text-left text-sm">
              <tbody className="divide-y divide-border bg-white">
                {per100Rows.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row" className="px-4 py-2.5 font-medium">
                      {k}
                    </th>
                    <td className="px-4 py-2.5 text-right tabular-nums text-foreground/80">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section aria-labelledby="goals">
            <h2 id="goals" className="text-2xl font-semibold tracking-tight">
              Is {name.toLowerCase()} good for your goals?
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-white p-5">
                <h3 className="font-semibold">Weight loss</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{notes.weightLoss}</p>
              </div>
              <div className="rounded-xl border border-border bg-white p-5">
                <h3 className="font-semibold">Muscle building</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{notes.muscle}</p>
              </div>
            </div>
            {food.tips.length ? (
              <ul className="mt-6 list-disc space-y-2 pl-5 text-foreground/80">
                {food.tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : null}
          </section>

          {compare ? (
            <section aria-labelledby="compare">
              <h2 id="compare" className="text-2xl font-semibold tracking-tight">
                {name} vs {shortName(compare.name).toLowerCase()}
              </h2>
              <div className="mt-4">
                <CompareTable food={food} other={compare} />
              </div>
            </section>
          ) : null}

          <FaqAccordion
            variant="stacked"
            items={faq}
            title="Frequently asked questions"
            subtitle={`Answers calculated from ${food.source} values. Educational information only.`}
          />

          <section aria-labelledby="sources" className="rounded-2xl border border-border bg-muted/30 p-5 text-sm">
            <h2 id="sources" className="text-base font-semibold">
              Source &amp; method
            </h2>
            <p className="mt-2 leading-relaxed text-foreground/80">
              Values per 100 g are from the{" "}
              <a href={IFCT_URL} className="fk-link font-semibold" target="_blank" rel="noopener noreferrer">
                Indian Food Composition Tables 2017
              </a>{" "}
              (ICMR–National Institute of Nutrition, Hyderabad), food code {food.sourceRef} &ldquo;{food.sourceName}
              &rdquo;. Serving values are calculated from those figures; serving weights are typical household
              measures.
            </p>
            {food.sourceNote ? <p className="mt-2 leading-relaxed text-foreground/80">{food.sourceNote}</p> : null}
            <p className="mt-2 text-xs text-muted-foreground">
              Last updated{" "}
              <time dateTime={updated.toISOString()}>
                {updated.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </time>
              . Values vary with variety, brand and cooking. Not medical advice —{" "}
              <Link href="/nutrition-disclaimer" className="underline">
                nutrition disclaimer
              </Link>
              .
            </p>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-[#0A0A0A] p-5 text-white">
            <p className="text-sm font-semibold">How much should you eat?</p>
            <p className="mt-1 text-sm text-white/70">
              {highProtein
                ? `Find your daily protein target, then see how much ${name.toLowerCase()} helps you hit it.`
                : "Work out your daily calories, then fit your favourite foods around them."}
            </p>
            <ul className="mt-4 space-y-2">
              {calculators.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none"
                  >
                    {c.title}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {articles.length ? (
            <div className="rounded-2xl border border-border p-5">
              <p className="text-sm font-semibold">Related guides</p>
              <ul className="mt-3 space-y-2 text-sm">
                {articles.map((a) => (
                  <li key={a.href}>
                    <Link href={a.href} className="fk-link">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>

      {related.length ? (
        <section aria-labelledby="related-foods" className="mt-14">
          <h2 id="related-foods" className="text-2xl font-semibold tracking-tight">
            Related foods
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <FoodCard food={r} />
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/foods/indian" className="fk-link font-semibold">
              Browse all Indian foods →
            </Link>
          </p>
        </section>
      ) : null}
    </main>
  );
}
