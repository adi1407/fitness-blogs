import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { IndianFoodsCarousel } from "@/features/foods/components/IndianFoodsCarousel";
import { IndianFoodsCircularGallery } from "@/features/foods/components/IndianFoodsCircularGallery";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Indian High-Protein Foods — Macros for Fat Loss & Muscle",
  description:
    "Practical Indian foods for protein goals: paneer, dal, eggs, curd, soya, and more — with links to protein and macro calculators.",
  alternates: { canonical: "/foods/indian" },
  openGraph: {
    title: "Indian High-Protein Foods | FitKnowledge",
    description:
      "Everyday Indian staples mapped to protein and meal planning.",
    url: "/foods/indian",
  },
};

const foods = [
  {
    name: "Paneer",
    note: "Dense protein; easy to portion for muscle or fat-loss meals.",
  },
  {
    name: "Dal (lentils)",
    note: "Plant protein + fiber; combine with grains for complete meals.",
  },
  {
    name: "Eggs",
    note: "Convenient complete protein for breakfast or snacks.",
  },
  {
    name: "Curd / Greek-style yogurt",
    note: "High protein when strained; pairs well with fruit or spices.",
  },
  {
    name: "Soya chunks / tofu",
    note: "Strong vegetarian protein options for curry-style meals.",
  },
  {
    name: "Chicken / fish",
    note: "Lean animal proteins when included in your diet pattern.",
  },
];

export default function IndianFoodsPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Foods",
        item: `${siteUrl}/foods`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Indian Foods",
        item: `${siteUrl}/foods/indian`,
      },
    ],
  };

  return (
    <main className="fk-page flex-1 py-16">
      <JsonLd data={breadcrumbLd} />

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
          <li className="text-foreground">Indian</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Indian high-protein foods
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Search demand for Indian diet protein is a differentiator. This hub
        connects everyday kitchen staples to calculators and nutrition guides.
      </p>

      <aside className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6">
        <h2 className="text-lg font-semibold">Start here</h2>
        <p className="mt-2 text-muted-foreground">
          Set a protein target, then build meals around 2–3 of the foods below
          most days.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/tools/protein-calculator"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            Protein calculator
          </Link>
          <Link
            href="/nutrition/protein"
            className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold"
          >
            Protein guide
          </Link>
        </div>
      </aside>

      <IndianFoodsCarousel />

      <IndianFoodsCircularGallery />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Staples to prioritize</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {foods.map((food) => (
            <li
              key={food.name}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="text-lg font-semibold">{food.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{food.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12 text-xs text-muted-foreground">
        Educational information only. Nutrient values vary by brand and prep —
        verify labels when tracking closely.{" "}
        <Link href="/medical-disclaimer" className="underline">
          Medical disclaimer
        </Link>
        .
      </p>
    </main>
  );
}
