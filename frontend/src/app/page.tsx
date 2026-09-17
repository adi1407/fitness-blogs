import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Evidence-informed fitness, nutrition, and training — guides, calculators, foods, and exercises built for real life.",
};

const pillars = [
  {
    href: "/nutrition",
    title: "Nutrition",
    text: "Macros, calories, hydration, and Indian diet context.",
  },
  {
    href: "/weight-loss",
    title: "Weight Loss",
    text: "Calorie deficit, training, and sustainable fat-loss habits.",
  },
  {
    href: "/muscle-building",
    title: "Muscle Building",
    text: "Hypertrophy, protein, progressive overload, recovery.",
  },
  {
    href: "/tools",
    title: "Tools",
    text: "TDEE, macros, protein, BMI — calculators that teach.",
  },
  {
    href: "/exercises",
    title: "Exercises",
    text: "Form, programming cues, and muscle-group libraries.",
  },
  {
    href: "/foods",
    title: "Foods",
    text: "Structured nutrition data with an Indian foods focus.",
  },
];

export default function HomePage() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-brand-50 via-background to-orange-50">
        <div className="mx-auto flex w-full max-w-5xl flex-col px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <p className="text-sm font-medium tracking-wide text-primary">
            Fitness knowledge platform
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Build a stronger body. Understand your nutrition.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Evidence-informed fitness, nutrition, and training guidance designed
            for real life — with calculators, food data, and deep guides.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/nutrition"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore Guides
            </Link>
            <Link
              href="/tools/calorie-calculator"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-brand-50"
            >
              Calculate Calories
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">Explore</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Architecture for search traffic: pillars, tools, and databases — not
          a thin post list.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block h-full rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary hover:bg-brand-50"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
