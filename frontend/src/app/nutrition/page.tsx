import type { Metadata } from "next";
import Link from "next/link";
import { TrackedHubLink } from "@/components/analytics/TrackedHubLink";
import { NutritionFocusCards } from "@/features/nutrition/components/NutritionFocusCards";

export const metadata: Metadata = {
  title: "Nutrition Guides — Protein, Calories, Macros & Indian Diet",
  description:
    "Learn nutrition for fat loss and muscle gain: protein, calories, carbs, fats, hydration, meal timing, and Indian diet guidance with calculators.",
  alternates: { canonical: "/nutrition" },
  openGraph: {
    title: "Nutrition Guides | FitKnowledge",
    description:
      "Evidence-informed nutrition pillars with calculators and food database links.",
    url: "/nutrition",
  },
};

const topics = [
  {
    href: "/nutrition/protein",
    title: "Protein",
    text: "How much you need, muscle growth, fat loss, timing, and food sources.",
  },
  {
    href: "/tools/calorie-calculator",
    title: "Calories",
    text: "Estimate needs and connect calorie targets to real meal planning.",
  },
  {
    href: "/tools/macro-calculator",
    title: "Macros",
    text: "Turn calories into protein, carbs, and fat for your goal.",
  },
  {
    href: "/foods/indian",
    title: "Indian nutrition",
    text: "Practical macros for roti, dal, paneer, eggs, and vegetarian building blocks.",
  },
];

export default function NutritionPage() {
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
          <li className="text-foreground">Nutrition</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Nutrition
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Nutrition content built for search intent: clear answers, calculators
        when people need numbers, and pathways into foods and training — not
        thin keyword posts.
      </p>

      <aside className="fk-tool-card mt-8 p-6">
        <h2 className="text-lg font-semibold">Quick start</h2>
        <p className="mt-2 text-muted-foreground">
          Most readers arrive asking about protein or calories. Start with the
          protein hub, then use a calculator, then explore Indian high-protein
          foods.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <TrackedHubLink
            href="/nutrition/protein"
            label="Protein guide"
            className="fk-btn-primary rounded-full"
          >
            Protein guide
          </TrackedHubLink>
          <TrackedHubLink
            href="/tools/protein-calculator"
            label="Protein calculator"
            className="fk-btn-ghost rounded-full"
          >
            Protein calculator
          </TrackedHubLink>
          <TrackedHubLink
            href="/foods/indian"
            label="Indian foods"
            className="fk-btn-ghost rounded-full"
          >
            Indian foods
          </TrackedHubLink>
        </div>
      </aside>

      <NutritionFocusCards />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Core topics</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <li key={topic.href}>
              <Link
                href={topic.href}
                className="fk-panel block p-5 transition hover:border-accent"
              >
                <h3 className="text-lg font-semibold">{topic.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{topic.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
