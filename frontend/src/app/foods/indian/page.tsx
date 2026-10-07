import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/seo";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { FoodIndex } from "@/features/foods/components/FoodIndex";
import { fetchFoodsSafe } from "@/features/foods/api/foods";
import { shortName } from "@/features/foods/lib/nutrition";
import { ogImageUrl } from "@/lib/og/url";

export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title = "Indian Food Calories & Protein Chart — Dal, Roti, Paneer & More";
const description =
  "Calories, protein, carbs and fat for everyday Indian foods per katori, roti and 100 g. Filter veg, egg or non-veg and high-protein foods. Values from IFCT 2017 (NIN).";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/foods/indian" },
  openGraph: {
    ...OG_DEFAULTS,
    title: "Indian Food Calories & Protein Chart | fitlives",
    description,
    url: "/foods/indian",
    images: [
      {
        url: ogImageUrl({ title: "Indian food calories & protein", eyebrow: "Food database" }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function IndianFoodsPage() {
  const foods = await fetchFoodsSafe();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Foods", item: `${siteUrl}/foods` },
      { "@type": "ListItem", position: 3, name: "Indian Foods", item: `${siteUrl}/foods/indian` },
    ],
  };

  const itemListLd = foods.length
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Indian food calories and protein",
        itemListElement: foods.map((f, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: shortName(f.name),
          url: `${siteUrl}/foods/${f.slug}`,
        })),
      }
    : null;

  return (
    <main className="fk-page flex-1 py-16">
      <JsonLd data={breadcrumbLd} />
      {itemListLd && <JsonLd data={itemListLd} />}

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
        Indian food calories &amp; protein
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Calories, protein, carbs and fat for the foods you actually eat — measured per katori, roti or piece as
        well as per 100 g. Tap any food for the full breakdown and a serving calculator.
      </p>

      {foods.length > 0 ? (
        <FoodIndex foods={foods} />
      ) : (
        <p className="mt-10 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
          The food database is temporarily unavailable. Please refresh in a minute.
        </p>
      )}

      <aside className="mt-12 rounded-2xl border border-border bg-[#F5F5F5] p-6">
        <h2 className="text-lg font-semibold">Turn these numbers into a plan</h2>
        <p className="mt-2 text-muted-foreground">
          Work out your daily protein and calorie targets first, then build meals around 2–3 high-protein foods
          from the list.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/protein-calculator"
            className="rounded-full bg-[#0A0A0A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0A0A0A]/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800]"
          >
            Protein calculator
          </Link>
          <Link
            href="/calorie-calculator"
            className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold hover:border-[#FF9800] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800]"
          >
            Calorie calculator
          </Link>
          <Link
            href="/nutrition/protein"
            className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold hover:border-[#FF9800] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800]"
          >
            Protein guide
          </Link>
        </div>
      </aside>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold">Where these numbers come from</h2>
        <p className="mt-3 text-muted-foreground">
          Values come from the{" "}
          <a
            href="https://www.nin.res.in/ebooks/IFCT2017.pdf"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Indian Food Composition Tables 2017
          </a>{" "}
          published by the ICMR–National Institute of Nutrition, which analysed foods sampled across India. Each
          food page lists its IFCT food code so you can check it yourself. Dals and grains are given for the dry
          (raw) weight, because that is what the tables measure — serving sizes show the cooked portion it makes.
        </p>
      </section>

      <p className="mt-12 text-xs text-muted-foreground">
        Educational information only. Nutrient values vary by variety, recipe and cooking method — check labels
        when tracking closely.{" "}
        <Link href="/medical-disclaimer" className="underline">
          Medical disclaimer
        </Link>
        .
      </p>
    </main>
  );
}
