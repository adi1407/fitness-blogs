import type { Metadata } from "next";
import Link from "next/link";
import { TrackedHubLink } from "@/components/analytics/TrackedHubLink";
import { FaqScrollerBlock } from "@/features/shared/components/FaqScrollerBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { MuscleBuildingVisuals } from "@/features/muscle-building/components/MuscleBuildingVisuals";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Muscle Building Guide — Hypertrophy, Protein & Progressive Overload",
  description:
    "Learn how to build muscle: progressive overload, protein targets, recovery, and programming. Explore exercise libraries and protein calculators.",
  alternates: { canonical: "/muscle-building" },
  openGraph: {
    title: "Muscle Building Guide | FitKnowledge",
    description:
      "Hypertrophy fundamentals with tools, exercises, and nutrition links.",
    url: "/muscle-building",
  },
};

const faq = [
  {
    q: "How long does it take to build muscle?",
    a: "Visible changes usually take weeks to months of consistent training, progressive overload, enough protein and calories, and recovery. Beginners often progress faster than advanced lifters.",
  },
  {
    q: "Do I need a bulk to gain muscle?",
    a: "A modest calorie surplus can support faster gains, but beginners can build muscle near maintenance. Large surpluses mainly add fat.",
  },
  {
    q: "How important is protein for hypertrophy?",
    a: "Protein provides amino acids for repair and growth. Pair adequate intake with hard training — protein alone does not build muscle.",
  },
];

export default function MuscleBuildingPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Muscle Building",
        item: `${siteUrl}/muscle-building`,
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
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Muscle Building</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Muscle building fundamentals
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Pillar hub · Educational content · Not medical advice
      </p>

      <aside className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6">
        <h2 className="text-lg font-semibold">Quick answer</h2>
        <p className="mt-2 text-muted-foreground">
          Train hard with progressive overload, eat enough protein and total
          calories, sleep well, and stay consistent. Use the exercise library
          and protein calculator to turn principles into a plan.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <TrackedHubLink
            href="/exercises"
            label="Exercise library"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            Exercise library ?
          </TrackedHubLink>
          <TrackedHubLink
            href="/tools/protein-calculator"
            label="Protein calculator"
            className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold"
          >
            Protein calculator
          </TrackedHubLink>
        </div>
      </aside>

      <MuscleBuildingVisuals />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">What drives hypertrophy</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Mechanical tension</span>{" "}
            — challenging sets with good form over time
          </li>
          <li>
            <span className="font-medium text-foreground">Progressive overload</span>{" "}
            — more reps, load, or quality work across weeks
          </li>
          <li>
            <span className="font-medium text-foreground">Recovery & nutrition</span>{" "}
            — protein, calories, sleep, and stress management
          </li>
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Next steps</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              href: "/exercises/chest",
              title: "Chest exercises",
              text: "Press and fly patterns for upper-body growth.",
            },
            {
              href: "/exercises/legs",
              title: "Leg exercises",
              text: "Squats, hinges, and accessories for lower body.",
            },
            {
              href: "/nutrition/protein",
              title: "Protein guide",
              text: "How much protein supports muscle growth.",
            },
            {
              href: "/programs",
              title: "Programs",
              text: "Structured plans (coming as content expands).",
            },
          ].map((item) => (
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
    </main>
  );
}
