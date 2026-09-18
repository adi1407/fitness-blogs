import type { Metadata } from "next";
import Link from "next/link";
import FUIBentoGridDark from "@/components/ui/bento";
import { ToolsBentoGrid } from "@/features/tools/components/ToolsBentoGrid";
import {
  ToolsGhostBand,
  ToolsVisualBands,
} from "@/features/tools/components/ToolsVisualBands";

export const metadata: Metadata = {
  title: "Fitness Calculators — TDEE, Protein, Macros, BMI & More",
  description:
    "Free fitness calculators for TDEE, calories, macros, protein, BMR, and BMI. Each tool links into guides and food databases.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Fitness Calculators | FitKnowledge",
    description:
      "Calculator hub designed for search intent and educational next steps.",
    url: "/tools",
  },
};

const calculators = [
  {
    href: "/tools/tdee-calculator",
    title: "TDEE Calculator",
    intent: "How many calories should I eat?",
  },
  {
    href: "/tools/calorie-calculator",
    title: "Calorie Calculator",
    intent: "Daily calorie targets by goal",
  },
  {
    href: "/tools/macro-calculator",
    title: "Macro Calculator",
    intent: "Protein, carbs, and fat split",
  },
  {
    href: "/tools/protein-calculator",
    title: "Protein Calculator",
    intent: "How much protein do I need?",
  },
  {
    href: "/tools/bmr-calculator",
    title: "BMR Calculator",
    intent: "Basal metabolic rate estimate",
  },
  {
    href: "/tools/bmi-calculator",
    title: "BMI Calculator",
    intent: "Body mass index screening metric",
  },
];

export default function ToolsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Tools</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Fitness calculators
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Calculators are SEO landing pages for calculation intent — and the
        bridge into guides, foods, and programs. Results should educate, not
        end the journey.
      </p>

      <ToolsVisualBands />

      <div className="mt-12">
        <ToolsBentoGrid />
      </div>

      <div className="mt-16">
        <FUIBentoGridDark />
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="block h-full rounded-xl border border-border bg-card p-5 hover:border-primary hover:bg-brand-50"
            >
              <h2 className="text-lg font-semibold">{tool.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{tool.intent}</p>
            </Link>
          </li>
        ))}
      </ul>

      <ToolsGhostBand />
    </main>
  );
}
