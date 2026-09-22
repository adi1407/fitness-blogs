import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Slideshow from "@/components/ui/slideshow";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqScrollerBlock } from "@/features/shared/components/FaqScrollerBlock";
import {
  ATHLETE_AFFILIATION_NOTE,
  getAllAthleteSlugs,
  getAthleteStory,
} from "@/features/athletes/data/athleteStories";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllAthleteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getAthleteStory(slug);
  if (!story) {
    return { title: "Athlete story not found" };
  }
  return {
    title: story.title,
    description: story.excerpt,
    alternates: { canonical: `/athletes/${story.slug}` },
    openGraph: {
      title: `${story.title} | fitlives`,
      description: story.excerpt,
      url: `/athletes/${story.slug}`,
      type: "article",
    },
  };
}

export default async function AthleteStoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = getAthleteStory(slug);
  if (!story) notFound();

  const url = `${siteUrl}/athletes/${story.slug}`;

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
      {
        "@type": "ListItem",
        position: 3,
        name: story.name,
        item: url,
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.excerpt,
    dateModified: story.updatedAt,
    author: {
      "@type": "Organization",
      name: "fitlives",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "fitlives",
      url: siteUrl,
    },
    mainEntityOfPage: url,
    image: story.slides[0]?.img,
  };

  const updatedLabel = new Date(story.updatedAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="fk-page fk-page--content flex-1 py-12 sm:py-16">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={articleLd} />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="fk-link-muted">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/athletes" className="fk-link-muted">
              Athletes
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">{story.name}</li>
        </ol>
      </nav>

      <p className="fk-meta mt-6 text-muted-foreground">{story.sport}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {story.title}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Written by fitlives · Updated {updatedLabel} ·{" "}
        {story.readingMinutes} min read
      </p>

      <aside className="mt-6 rounded-2xl border border-[#FF9800]/40 bg-[#FFF8F0] p-4 text-sm leading-relaxed text-muted-foreground">
        {ATHLETE_AFFILIATION_NOTE}
      </aside>

      <section
        className="mt-8 rounded-2xl border border-border bg-muted/40 p-5"
        aria-labelledby="quick-answer"
      >
        <h2 id="quick-answer" className="text-sm font-semibold tracking-wide uppercase">
          Quick answer
        </h2>
        <p className="mt-2 text-base leading-relaxed text-foreground">
          {story.quickAnswer}
        </p>
      </section>

      <div className="mt-8">
        <Slideshow
          slides={story.slides}
          label={`${story.name} editorial slideshow`}
        />
      </div>

      <nav
        aria-label="Table of contents"
        className="mt-10 rounded-2xl border border-border p-5"
      >
        <p className="text-sm font-semibold">On this page</p>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm">
          {story.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="fk-link">
                {section.heading}
              </a>
            </li>
          ))}
          <li>
            <a href="#takeaways" className="fk-link">
              Key takeaways
            </a>
          </li>
          <li>
            <a href="#related" className="fk-link">
              Related tools &amp; guides
            </a>
          </li>
        </ol>
      </nav>

      <article className="mt-10 space-y-10">
        {story.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="text-2xl font-semibold tracking-tight">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <section id="takeaways">
          <h2 className="text-2xl font-semibold tracking-tight">
            Key takeaways
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {story.takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </article>

      <FaqScrollerBlock
        className="mt-12"
        items={story.faqs}
        title="FAQs"
      />

      <section id="related" className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          Related tools &amp; guides
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {story.related.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block h-full rounded-xl border border-border bg-card p-5 hover:border-accent hover:bg-accent-soft/40"
              >
                <h3 className="text-lg font-semibold">{item.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Sources &amp; method</p>
        <p className="mt-2 leading-relaxed">
          This commentary summarizes durable fitness themes that appear across
          years of public coverage of athletic careers. We do not reproduce
          interviews, social captions, or copyrighted reporting. For training
          and nutrition decisions, use fitlives tools and guides — and
          consult a qualified professional for personal advice.
        </p>
      </section>

      <p className="mt-8 text-xs text-muted-foreground">
        Educational information only. See our{" "}
        <Link href="/medical-disclaimer" className="underline">
          medical disclaimer
        </Link>
        .
      </p>
    </main>
  );
}
