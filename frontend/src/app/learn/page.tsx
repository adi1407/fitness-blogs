import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { LearnMasonrySection } from "@/features/learn/components/LearnMasonrySection";
import { LEARN_CATEGORIES } from "@/features/learn/data/learnArticles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Fitness Guides & Articles — Learn Nutrition, Fat Loss & Muscle",
  description:
    "Browse FitKnowledge guides by category: protein, weight loss, muscle building, training, and calculators. Evidence-informed fitness learning hub.",
  alternates: { canonical: "/learn" },
  openGraph: {
    title: "Learn | FitKnowledge Guides",
    description:
      "Category-filtered fitness guides with pathways into tools, foods, and exercises.",
    url: "/learn",
  },
};

const categoryLinks = [
  { href: "/nutrition", label: "Nutrition" },
  { href: "/nutrition/protein", label: "Protein" },
  { href: "/weight-loss", label: "Weight Loss" },
  { href: "/muscle-building", label: "Muscle Building" },
  { href: "/training", label: "Training" },
  { href: "/tools", label: "Tools" },
];

export default function LearnPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learn",
        item: `${siteUrl}/learn`,
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbLd} />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Learn</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Fitness guides & articles
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        A searchable learning hub — not a thin blog. Filter by pillar cluster,
        then follow links into deep guides, calculators, foods, and exercises.
      </p>

      <aside className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6">
        <h2 className="text-lg font-semibold">Browse by pillar</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Crawlable category links (same filters as the grid below).
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {categoryLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex rounded-full border border-border bg-white px-4 py-2 text-sm font-medium hover:border-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="sr-only">
          {LEARN_CATEGORIES.filter((c) => c.id !== "all").map((c) => (
            <li key={c.id}>{c.label}</li>
          ))}
        </ul>
      </aside>

      <LearnMasonrySection />

      <p className="mt-12 text-xs text-muted-foreground">
        Educational information only. See our{" "}
        <Link href="/medical-disclaimer" className="underline">
          medical disclaimer
        </Link>
        .
      </p>
    </main>
  );
}
