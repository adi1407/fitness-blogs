import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ATHLETE_AFFILIATION_NOTE,
  ATHLETE_STORIES,
} from "@/features/athletes/data/athleteStories";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Athlete Fitness Stories — Lessons From Public Careers",
  description:
    "Original fitlives commentary on fitness themes from public athletic careers — consistency, power, recovery, and discipline. Not biographies or endorsements.",
  alternates: { canonical: "/athletes" },
  openGraph: {
    title: "Athlete Fitness Stories | fitlives",
    description:
      "Educational lessons inspired by publicly discussed athletic habits — with tools and guides to apply them carefully.",
    url: "/athletes",
  },
};

export default function AthletesHubPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Athlete stories",
        item: `${siteUrl}/athletes`,
      },
    ],
  };

  return (
    <main className="fk-page flex-1 py-16">
      <JsonLd data={breadcrumbLd} />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="fk-link-muted">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Athletes</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Athlete fitness stories
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Editorial commentary on themes that appear in public discussions of
        athletic careers — consistency, explosive strength, recovery, and
        discipline. These pages are written by fitlives for education, not
        as official biographies or training prescriptions.
      </p>

      <aside className="mt-8 rounded-2xl border border-[#FF9800]/40 bg-[#FFF8F0] p-5 text-sm leading-relaxed text-foreground">
        <p className="font-semibold">Independence notice</p>
        <p className="mt-2 text-muted-foreground">{ATHLETE_AFFILIATION_NOTE}</p>
      </aside>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {ATHLETE_STORIES.map((story) => (
          <li key={story.slug}>
            <Link
              href={`/athletes/${story.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-foreground/30"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.cardImage}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="fk-meta text-muted-foreground">{story.sport}</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight group-hover:underline">
                  {story.name}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {story.lessonOneLiner}
                </p>
                <p className="mt-4 text-sm font-semibold text-foreground">
                  Read the story →
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

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
