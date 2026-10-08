import type { Metadata } from "next";
import { ArrowRight, Calculator } from "lucide-react";
import { TrackedHubLink } from "@/components/analytics/TrackedHubLink";
import { SubscribeForm } from "@/features/newsletter/components/SubscribeForm";
import { CALCULATORS } from "@/features/tools/content/links";
import { fetchPublishedArticles } from "@/lib/api/blog";

export const metadata: Metadata = {
  title: "Start here",
  description:
    "Free fitness calculators, Indian food data and evidence-based guides from fitlives — the best place to start.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/start" },
};

export const revalidate = 900;

const FEATURED_CALCS = [
  { key: "tdee", badge: "Most used" },
  { key: "protein", badge: null },
  { key: "deficit", badge: null },
  { key: "bmi", badge: null },
] as const;

const TOPICS = [
  { href: "/weight-loss", label: "Weight loss", blurb: "Calorie deficits, plateaus and Indian meals that work" },
  { href: "/muscle-building", label: "Muscle building", blurb: "Protein, training and realistic timelines" },
  { href: "/nutrition", label: "Nutrition", blurb: "Protein, carbs, fats and hydration explained" },
  { href: "/foods/indian", label: "Indian food data", blurb: "Calories and protein for roti, dal, paneer and more" },
  { href: "/tools", label: "All calculators", blurb: "Calories, macros, body fat, 1RM and more" },
  { href: "/blog", label: "Latest articles", blurb: "Everything new on fitlives" },
] as const;

async function popularArticles() {
  const articles = await fetchPublishedArticles({ summary: true, limit: 500, revalidate: 900 });
  return articles
    .filter((a) => a.path)
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 5);
}

/** Link-in-bio landing for social traffic: tools first, then popular guides. */
export default async function StartPage() {
  const popular = await popularArticles();

  return (
    <main className="fk-page fk-page--content flex-1 py-10 sm:py-16">
      <p className="fk-meta-accent">Start here</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Know your numbers, then eat and train for them
      </h1>
      <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
        Free calculators built for Indian diets, plus short guides that explain what to do with
        the result. No sign-up needed.
      </p>

      <section aria-labelledby="start-calcs" className="mt-8">
        <h2 id="start-calcs" className="sr-only">
          Popular calculators
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {FEATURED_CALCS.map(({ key, badge }, i) => {
            const c = CALCULATORS[key];
            const primary = i === 0;
            return (
              <li key={key} className={primary ? "sm:col-span-2" : undefined}>
                <TrackedHubLink
                  href={c.href}
                  label={c.title}
                  event="cta_click"
                  placement="start_calculators"
                  className={
                    primary
                      ? "group flex items-center gap-4 rounded-2xl bg-[#0A0A0A] p-5 text-white transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none sm:p-6"
                      : "group flex h-full items-center gap-3 rounded-xl border border-border bg-white p-4 transition hover:border-[#0A0A0A] focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none"
                  }
                >
                  <Calculator
                    className={primary ? "size-6 shrink-0 text-[#FF9800]" : "size-5 shrink-0 text-muted-foreground"}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className={primary ? "text-lg font-semibold" : "font-semibold text-foreground"}>
                        {c.title}
                      </span>
                      {badge ? (
                        <span className="rounded-full bg-[#FF9800] px-2 py-0.5 text-[11px] font-semibold text-[#0A0A0A]">
                          {badge}
                        </span>
                      ) : null}
                    </span>
                    <span className={primary ? "mt-1 block text-sm text-white/75" : "mt-0.5 block text-sm text-muted-foreground"}>
                      {primary ? "Find your maintenance calories in 30 seconds — the starting point for fat loss or muscle gain." : c.description}
                    </span>
                  </span>
                  <ArrowRight
                    className={primary ? "size-5 shrink-0 transition group-hover:translate-x-0.5" : "size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-[#FF9800]"}
                    aria-hidden="true"
                  />
                </TrackedHubLink>
              </li>
            );
          })}
        </ul>
      </section>

      {popular.length > 0 ? (
        <section aria-labelledby="start-popular" className="mt-12">
          <h2 id="start-popular" className="text-xl font-semibold tracking-tight">
            Popular right now
          </h2>
          <ol className="mt-4 divide-y divide-border rounded-2xl border border-border bg-white">
            {popular.map((a, i) => (
              <li key={a.id}>
                <TrackedHubLink
                  href={a.path!}
                  label={a.title}
                  event="cta_click"
                  placement="start_popular"
                  className="group flex items-start gap-4 p-4 transition hover:bg-brand-50/60 focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none sm:p-5"
                >
                  <span className="mt-0.5 w-5 shrink-0 text-sm font-semibold text-[#FF9800]">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-foreground group-hover:underline group-hover:decoration-[#FF9800] group-hover:underline-offset-4">
                      {a.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {[a.subcategoryLabel ?? a.categoryLabel, a.readingTime ? `${a.readingTime} min read` : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </span>
                </TrackedHubLink>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section aria-labelledby="start-topics" className="mt-12">
        <h2 id="start-topics" className="text-xl font-semibold tracking-tight">
          Pick a topic
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => (
            <li key={t.href}>
              <TrackedHubLink
                href={t.href}
                label={t.label}
                event="cta_click"
                placement="start_topics"
                className="flex h-full flex-col rounded-xl border border-border bg-white p-4 transition hover:border-[#0A0A0A] focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none"
              >
                <span className="font-semibold text-foreground">{t.label}</span>
                <span className="mt-1 text-sm text-muted-foreground">{t.blurb}</span>
              </TrackedHubLink>
            </li>
          ))}
        </ul>
      </section>

      <SubscribeForm
        source="start"
        className="mt-12"
        title="Get new guides and calculators by email"
      />

      <p className="fk-disclaimer mt-10">
        Educational information only — not medical advice. Consult a qualified professional for
        personal health decisions.
      </p>
    </main>
  );
}
