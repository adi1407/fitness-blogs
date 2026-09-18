import type { Metadata } from "next";
import Link from "next/link";
import { FaqScrollerBlock } from "@/features/shared/components/FaqScrollerBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { WeightLossSplitSection } from "@/features/weight-loss/components/WeightLossSplitSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Weight Loss Guide — Calorie Deficit, Training & Sustainable Fat Loss",
  description:
    "Learn how weight loss works: calorie deficit, protein, training, habits, and plateaus. Use TDEE and calorie calculators, then build a realistic plan.",
  alternates: { canonical: "/weight-loss" },
  openGraph: {
    title: "Weight Loss Guide | FitKnowledge",
    description:
      "Sustainable fat-loss pillars with calculators and nutrition next steps.",
    url: "/weight-loss",
  },
};

const faq = [
  {
    q: "How do I start losing weight safely?",
    a: "Most people start by estimating maintenance calories (TDEE), creating a moderate deficit, prioritizing protein and strength training, and improving sleep and daily activity. Extreme restriction is harder to sustain.",
  },
  {
    q: "Do I need cardio for fat loss?",
    a: "Cardio can help increase energy expenditure and support health, but a calorie deficit drives fat loss. Strength training helps preserve muscle while dieting.",
  },
  {
    q: "Why did my weight loss stall?",
    a: "Plateaus can come from underestimated intake, reduced NEAT, water retention, or targets that are no longer accurate after body-weight changes. Recheck TDEE and habits before drastic cuts.",
  },
];

const pillars = [
  {
    href: "/tools/tdee-calculator",
    title: "Energy balance",
    text: "Estimate maintenance, then set a moderate deficit.",
  },
  {
    href: "/nutrition/protein",
    title: "Protein & meals",
    text: "Protect lean mass and stay fuller while dieting.",
  },
  {
    href: "/training",
    title: "Training",
    text: "Lift to preserve muscle; add cardio for health and burn.",
  },
  {
    href: "/foods/indian",
    title: "Indian diet context",
    text: "Build deficit-friendly meals from familiar staples.",
  },
];

export default function WeightLossPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Weight Loss",
        item: `${siteUrl}/weight-loss`,
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="flex w-full flex-1 flex-col">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />

      {/* SSR SEO block — constrained */}
      <div className="mx-auto w-full max-w-5xl px-4 pt-16 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">Weight Loss</li>
          </ol>
        </nav>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Weight loss: a practical, evidence-informed path
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Pillar hub · Educational content · Not medical advice
        </p>

        <aside className="mt-8 rounded-2xl border border-orange-100 bg-orange-50 p-6">
          <h2 className="text-lg font-semibold">Quick answer</h2>
          <p className="mt-2 text-muted-foreground">
            Fat loss requires a sustained calorie deficit. Pair that with enough
            protein, resistance training, and habits you can keep — then use
            calculators to estimate a starting point.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/tools/tdee-calculator"
              className="rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-300"
            >
              TDEE calculator ?
            </Link>
            <Link
              href="/tools/calorie-calculator"
              className="rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold"
            >
              Calorie calculator
            </Link>
          </div>
        </aside>
      </div>

      {/* Full-bleed sticky scroll story — outside max-width / overflow shells */}
      <WeightLossSplitSection />

      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <section>
          <h2 className="text-2xl font-semibold">Core pillars</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {pillars.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block h-full rounded-xl border border-border bg-card p-5 hover:border-primary hover:bg-brand-50"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <FaqScrollerBlock
        className="mt-12"
        items={faq.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
        title="FAQs"
      />

        <p className="mt-12 text-xs text-muted-foreground">
          Educational information only. See our{" "}
          <Link href="/medical-disclaimer" className="underline">
            medical disclaimer
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
