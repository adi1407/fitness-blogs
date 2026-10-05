import type { Metadata } from "next";
import Link from "next/link";
import { CALCULATORS } from "@/features/tools/content/links";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const POPULAR_CALCS = ["calorie", "protein", "tdee", "bmi"] as const;

const GUIDE_HUBS = [
  { href: "/blog", label: "Latest articles" },
  { href: "/nutrition", label: "Nutrition" },
  { href: "/weight-loss", label: "Weight loss" },
  { href: "/muscle-building", label: "Muscle building" },
  { href: "/foods/indian", label: "Indian foods" },
  { href: "/exercises", label: "Exercises" },
];

/** Static on purpose: data fetching here would make every route dynamic. */
export default function NotFound() {
  return (
    <main className="fk-page fk-page--content flex-1 py-16">
      <p className="fk-meta-accent">404</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        It may have moved or the link may be mistyped. Try a search, or jump to
        one of our most-used tools and guides.
      </p>

      <form action="/search" method="get" role="search" className="mt-8 flex max-w-xl gap-2">
        <label htmlFor="nf-q" className="sr-only">
          Search fitlives
        </label>
        <input
          id="nf-q"
          name="q"
          type="search"
          placeholder="Search guides, foods, calculators…"
          className="min-h-11 flex-1 rounded-lg border border-border bg-white px-4 text-sm"
        />
        <button type="submit" className="fk-btn-primary">
          Search
        </button>
      </form>

      <section className="mt-12" aria-labelledby="nf-calcs">
        <h2 id="nf-calcs" className="text-xl font-semibold tracking-tight">
          Popular calculators
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {POPULAR_CALCS.map((key) => {
            const c = CALCULATORS[key];
            return (
              <li key={key}>
                <Link
                  href={c.href}
                  className="block rounded-xl border border-border bg-white p-4 transition-colors hover:border-accent"
                >
                  <span className="font-semibold text-foreground">{c.title}</span>
                  {c.description ? (
                    <span className="mt-1 block text-sm text-muted-foreground">{c.description}</span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="nf-guides">
        <h2 id="nf-guides" className="text-xl font-semibold tracking-tight">
          Browse guides
        </h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {GUIDE_HUBS.map((g) => (
            <li key={g.href}>
              <Link href={g.href} className="fk-link">
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12 text-sm text-muted-foreground">
        Still stuck?{" "}
        <Link href="/" className="fk-link">
          Go to the homepage
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="fk-link">
          tell us about the broken link
        </Link>
        .
      </p>
    </main>
  );
}
