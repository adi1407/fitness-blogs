import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { CALCULATORS, type LinkItem } from "@/features/tools/content/links";
import { HomeGhostFoldBand } from "@/features/home/components/HomeGhostFoldBand";
import { FaqAccordion } from "@/features/shared/components/FaqAccordion";
import { BRAND_NAME } from "@/lib/brand";
import { ogImageUrl } from "@/lib/og/url";
import { getPublicSiteUrl } from "@/lib/siteUrl";

const TITLE = "Free Fitness Calculators (Calories, Protein, BMI)";
const DESCRIPTION =
  "11 free fitness calculators: calories, deficit, TDEE, BMR, macros, protein, BMI, body fat, 1RM, water and steps — with Indian food context. No sign-up needed.";

const FAQ = [
  {
    question: "Which calculator should I use to lose weight?",
    answer:
      "Start with the calorie calculator or TDEE calculator to find your maintenance calories, then use the calorie deficit calculator to set a daily target for your goal weight and timeline. Add the protein calculator so you keep muscle while you lose fat.",
  },
  {
    question: "Are these fitness calculators free?",
    answer:
      "Yes. Every calculator is free and shows the full result without signing in. Signing in is optional and only saves your results so you can track them over time.",
  },
  {
    question: "How accurate are calorie and TDEE calculators?",
    answer:
      "They use the Mifflin–St Jeor equation, which is usually within about 10% of measured resting metabolism for most adults. Treat the number as a starting point and adjust after 2–3 weeks based on how your weight actually changes.",
  },
  {
    question: "Do the calculators work for Indian diets?",
    answer:
      "Yes. The maths is the same for everyone, and each calculator explains its result with Indian foods, Indian/Asian BMI cut-offs where relevant, and example meal plans built around dal, roti, rice, paneer and eggs.",
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer:
      "BMR is the energy your body burns at complete rest. TDEE adds everything else — daily movement, exercise and digesting food — so it is the number to base your eating on. Use the BMR calculator or TDEE calculator to see both.",
  },
];
const OG_IMAGE = ogImageUrl({ title: "Free fitness calculators", eyebrow: "Calories · Protein · Body fat" });

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools" },
  openGraph: {
    ...OG_DEFAULTS,
    title: `${TITLE} | ${BRAND_NAME}`,
    description: DESCRIPTION,
    url: "/tools",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "fitlives fitness calculators" }],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE] },
};

const GROUPS: { id: string; heading: string; blurb: string; tools: LinkItem[] }[] = [
  {
    id: "nutrition",
    heading: "Calories & nutrition",
    blurb: "Work out how much to eat — and what to eat it as.",
    tools: [
      CALCULATORS.calorie,
      CALCULATORS.deficit,
      CALCULATORS.tdee,
      CALCULATORS.bmr,
      CALCULATORS.macro,
      CALCULATORS.protein,
      CALCULATORS.water,
    ],
  },
  {
    id: "body",
    heading: "Body composition",
    blurb: "Screening numbers to track alongside the mirror and the tape.",
    tools: [CALCULATORS.bmi, CALCULATORS.bodyFat],
  },
  {
    id: "training",
    heading: "Training & activity",
    blurb: "Plan your lifting loads and see what your daily steps are worth.",
    tools: [CALCULATORS.oneRepMax, CALCULATORS.steps],
  },
];

const GUIDE: { goal: string; tool: LinkItem }[] = [
  { goal: "I want to lose weight by a certain date", tool: CALCULATORS.deficit },
  { goal: "How many calories should I eat?", tool: CALCULATORS.calorie },
  { goal: "How many calories do I burn in a day?", tool: CALCULATORS.tdee },
  { goal: "How much protein do I need?", tool: CALCULATORS.protein },
  { goal: "I want grams of protein, carbs and fat", tool: CALCULATORS.macro },
  { goal: "Am I a healthy weight for my height?", tool: CALCULATORS.bmi },
  { goal: "How much of my weight is fat?", tool: CALCULATORS.bodyFat },
  { goal: "What weight should I lift for 8 reps?", tool: CALCULATORS.oneRepMax },
  { goal: "How many calories did my walk burn?", tool: CALCULATORS.steps },
  { goal: "How much water should I drink?", tool: CALCULATORS.water },
];

const siteUrl = getPublicSiteUrl();
const allTools = GROUPS.flatMap((g) => g.tools);

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Fitness calculators",
  itemListElement: allTools.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.title,
    url: `${siteUrl}${t.href}`,
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteUrl}/tools` },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function ToolsPage() {
  return (
    <main className="fk-page flex-1 py-16">
      <JsonLd data={itemListLd} />
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
          <li className="text-foreground">Calculators</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Free fitness calculators
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Quick, evidence-based numbers for calories, protein, body composition
        and training — with Indian food context, worked examples and the
        sources behind every formula. Free, and no sign-in needed.
      </p>

      <nav aria-label="Calculator groups" className="mt-8 flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="fk-btn-ghost rounded-full px-4 py-2 text-sm">
            {g.heading}
          </a>
        ))}
        <a href="#which-calculator" className="fk-btn-ghost rounded-full px-4 py-2 text-sm">
          Which one do I need?
        </a>
      </nav>

      {GROUPS.map((group) => (
        <section key={group.id} id={group.id} aria-labelledby={`${group.id}-h`} className="mt-14 scroll-mt-24">
          <h2 id={`${group.id}-h`} className="text-2xl font-semibold tracking-tight">
            {group.heading}
          </h2>
          <p className="mt-1 text-muted-foreground">{group.blurb}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.tools.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="group fk-panel flex h-full flex-col justify-between gap-4 p-5 transition hover:border-[#FF9800] focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{tool.title}</h3>
                    {tool.description ? (
                      <p className="mt-1.5 text-sm text-muted-foreground">{tool.description}</p>
                    ) : null}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    Open calculator
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section id="which-calculator" aria-labelledby="which-calculator-h" className="mt-16 scroll-mt-24">
        <h2 id="which-calculator-h" className="text-2xl font-semibold tracking-tight">
          Which calculator do I need?
        </h2>
        <p className="mt-1 text-muted-foreground">Start from your question.</p>
        <div className="-mx-1 mt-6 overflow-x-auto px-1">
          <table className="w-full border-collapse overflow-hidden rounded-xl border border-border text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th scope="col" className="px-3 py-2.5 font-semibold">
                  Your question
                </th>
                <th scope="col" className="px-3 py-2.5 font-semibold">
                  Use
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {GUIDE.map((row) => (
                <tr key={row.goal}>
                  <td className="px-3 py-2.5 text-foreground/80">{row.goal}</td>
                  <td className="px-3 py-2.5">
                    <Link href={row.tool.href} className="fk-link font-semibold">
                      {row.tool.title}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          New to this? Most people start with the{" "}
          <Link href={CALCULATORS.calorie.href} className="fk-link font-semibold">
            calorie calculator
          </Link>{" "}
          and{" "}
          <Link href={CALCULATORS.protein.href} className="fk-link font-semibold">
            protein calculator
          </Link>
          , then read our guides to{" "}
          <Link href="/weight-loss" className="fk-link font-semibold">
            weight loss
          </Link>{" "}
          and{" "}
          <Link href="/muscle-building" className="fk-link font-semibold">
            muscle building
          </Link>
          . All results are educational estimates — speak to a qualified
          professional if you have a medical condition.
        </p>
      </section>

      <FaqAccordion
        className="mt-16"
        items={FAQ}
        subtitle="Quick answers about our calculators. Educational estimates only — not medical advice."
      />

      <div className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8">
        <HomeGhostFoldBand />
      </div>
    </main>
  );
}
