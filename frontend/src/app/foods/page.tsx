import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Foods Database — Calories, Macros & Indian Nutrition",
  description:
    "Browse foods by calories and macros. Start with Indian high-protein staples for fat loss and muscle gain meal planning.",
  alternates: { canonical: "/foods" },
  openGraph: {
    title: "Foods Database | FitKnowledge",
    description: "Structured food pathways into recipes, protein, and calculators.",
    url: "/foods",
  },
};

const collections = [
  {
    href: "/foods/indian",
    title: "Indian foods",
    text: "Roti, dal, paneer, eggs, curd, and everyday high-protein building blocks.",
  },
  {
    href: "/recipes",
    title: "Recipes",
    text: "Meal ideas that connect macros to real plates (expanding).",
  },
  {
    href: "/nutrition/protein",
    title: "Protein guide",
    text: "How food choices support daily protein targets.",
  },
  {
    href: "/tools/macro-calculator",
    title: "Macro calculator",
    text: "Set targets, then map them onto foods.",
  },
];

export default function FoodsPage() {
  return (
    <main className="fk-page flex-1 py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Foods</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Foods database
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Structured food content is a long-term SEO asset: people search for
        specific foods, macros, and Indian staples — then need a next action.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {collections.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block h-full rounded-xl border border-border bg-card p-5 hover:border-primary hover:bg-brand-50"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
