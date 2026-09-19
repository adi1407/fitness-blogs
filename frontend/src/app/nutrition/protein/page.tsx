import type { Metadata } from "next";
import Link from "next/link";
import { TrackedHubLink } from "@/components/analytics/TrackedHubLink";
import { FaqScrollerBlock } from "@/features/shared/components/FaqScrollerBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProteinTracingBeam } from "@/features/nutrition/components/ProteinTracingBeam";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Protein Guide — How Much Protein Do You Need?",
  description:
    "Learn how much protein you need per day for general health, muscle growth, and fat loss. Includes calculator links and Indian high-protein food pathways.",
  alternates: { canonical: "/nutrition/protein" },
  openGraph: {
    title: "Protein Guide | FitKnowledge",
    description:
      "Protein requirements by goal, with calculators and Indian food next steps.",
    url: "/nutrition/protein",
  },
};

const faq = [
  {
    q: "How much protein do I need per day?",
    a: "Needs depend on body weight, activity, and goals. People who lift regularly often benefit from higher protein than sedentary adults. Use the protein calculator for a personalized estimate, then confirm with a qualified professional if you have medical conditions.",
  },
  {
    q: "Is more protein always better for muscle growth?",
    a: "Protein supports muscle repair, but training stimulus, total calories, sleep, and progressive overload also matter. Extremely high intakes are not automatically better.",
  },
  {
    q: "Can vegetarians hit protein targets with Indian foods?",
    a: "Yes — paneer, dal, soya, Greek yogurt/curd, eggs (if included), milk, and tofu can form a strong base when portions and daily totals are planned.",
  },
];

export default function ProteinHubPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Nutrition",
        item: `${siteUrl}/nutrition`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Protein",
        item: `${siteUrl}/nutrition/protein`,
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
    <main className="fk-page flex-1 py-16">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="fk-link-muted">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/nutrition" className="fk-link-muted">
              Nutrition
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Protein</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Protein: how much do you need?
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Pillar hub · Educational content · Not medical advice
      </p>

      <aside className="fk-tool-card mt-8 p-6">
        <h2 className="text-lg font-semibold text-foreground">Quick answer</h2>
        <p className="mt-2 text-muted-foreground">
          Protein requirements depend on body weight, activity level, and goals.
          People doing regular resistance training generally need more protein
          than sedentary adults. Start with a calculator estimate, then build
          meals from high-protein foods.
        </p>
        <TrackedHubLink
          href="/tools/protein-calculator"
          label="Calculate protein requirement"
          className="fk-btn-accent mt-4 rounded-full"
        >
          Calculate your protein requirement →
        </TrackedHubLink>
      </aside>

      <ProteinTracingBeam>
        <section className="mt-12 prose-none pl-4 sm:pl-8">
          <h2 className="text-2xl font-semibold">On this page</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground">
            <li>What protein does</li>
            <li>Requirements by goal</li>
            <li>Calculate your target</li>
            <li>Indian high-protein foods</li>
            <li>FAQs</li>
          </ol>
        </section>

        <section className="mt-12 pl-4 sm:pl-8">
          <h2 className="text-2xl font-semibold">What protein does</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Protein provides amino acids used for tissue repair, enzyme function,
            and — when paired with training — supporting muscle protein synthesis.
            It is one part of a complete nutrition plan that also includes energy
            balance, carbohydrate and fat intake, micronutrients, and recovery.
          </p>
        </section>

        <section className="mt-12 pl-4 sm:pl-8">
          <h2 className="text-2xl font-semibold">Requirements by goal</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-brand-50">
                <tr>
                  <th className="px-4 py-3 font-semibold">Goal</th>
                  <th className="px-4 py-3 font-semibold">Practical focus</th>
                  <th className="px-4 py-3 font-semibold">Next step</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">General health</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Consistent daily intake across meals
                  </td>
                  <td className="px-4 py-3">
                    <Link href="/tools/protein-calculator" className="text-primary">
                      Calculator
                    </Link>
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">Muscle building</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Higher protein + progressive training + enough calories
                  </td>
                  <td className="px-4 py-3">
                    <Link href="/muscle-building" className="text-primary">
                      Muscle hub
                    </Link>
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">Fat loss</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Higher protein can help preserve lean mass in a deficit
                  </td>
                  <td className="px-4 py-3">
                    <Link href="/weight-loss" className="text-primary">
                      Weight loss
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 pl-4 sm:pl-8">
          <h2 className="text-2xl font-semibold">Calculate your target</h2>
          <p className="mt-4 text-muted-foreground">
            Use the protein calculator, then validate meal ideas with the foods
            database — especially Indian staples if that matches your kitchen.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/tools/protein-calculator"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Protein calculator
            </Link>
            <Link
              href="/tools/tdee-calculator"
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
            >
              TDEE calculator
            </Link>
            <Link
              href="/foods/indian"
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
            >
              Indian high-protein foods
            </Link>
          </div>
        </section>

        <div className="mt-12 pl-0 sm:pl-0">
          <FaqScrollerBlock
            items={faq.map((item) => ({
              question: item.q,
              answer: item.a,
            }))}
            title="FAQs"
          />
        </div>

        <p className="mt-12 pl-4 text-xs text-muted-foreground sm:pl-8">
          Educational information only. See our{" "}
          <Link href="/medical-disclaimer" className="underline">
            medical disclaimer
          </Link>
          .
        </p>
      </ProteinTracingBeam>
    </main>
  );
}
