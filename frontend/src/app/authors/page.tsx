import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { fetchAuthors } from "@/features/authors/api/authors";
import { OG_DEFAULTS, breadcrumbLd } from "@/lib/seo";

export const revalidate = 300;

const TITLE = "Our Authors & Reviewers";
const DESCRIPTION =
  "Meet the people who write and review fitlives guides on nutrition, weight loss and muscle building, and see every article they have published.";

export async function generateMetadata(): Promise<Metadata> {
  const authors = await fetchAuthors();
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/authors" },
    robots: authors.length === 0 ? { index: false, follow: true } : undefined,
    openGraph: {
      ...OG_DEFAULTS,
      title: `${TITLE} | fitlives`,
      description: DESCRIPTION,
      url: "/authors",
    },
  };
}

function countLabel(written: number, reviewed: number): string {
  const parts = [];
  if (written > 0) parts.push(`${written} article${written === 1 ? "" : "s"} written`);
  if (reviewed > 0) parts.push(`${reviewed} reviewed`);
  return parts.join(" · ");
}

export default async function AuthorsPage() {
  const authors = await fetchAuthors();

  return (
    <main className="fk-page flex-1 py-16">
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Authors", "/authors"]])} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="fk-link-muted">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Authors</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        Authors & reviewers
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Every fitlives guide names the person who wrote it. When a qualified
        reviewer has checked an article, they are credited separately as
        &ldquo;Reviewed by&rdquo;.
      </p>

      {authors.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-brand-50/40 px-6 py-12 text-center">
          <p className="text-base font-medium text-foreground">
            Author profiles are loading
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Please check back shortly.
          </p>
        </div>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {authors.map((author) => (
            <li key={author.slug}>
              <Link
                href={`/authors/${author.slug}`}
                className="fk-panel block h-full p-6 transition hover:border-accent"
              >
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground"
                  >
                    {author.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold">{author.name}</h2>
                    {author.credentials ? (
                      <p className="text-sm text-muted-foreground">
                        {author.credentials}
                      </p>
                    ) : null}
                  </div>
                </div>
                {author.bio ? (
                  <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
                    {author.bio}
                  </p>
                ) : null}
                <p className="mt-4 text-xs font-medium text-foreground">
                  {countLabel(author.writtenCount, author.reviewedCount)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <section className="article-body mt-14 max-w-3xl">
        <h2>How authorship works at fitlives</h2>
        <p>
          Every article on fitlives shows who wrote it. The author researches
          the topic, writes the guide and lists the sources used, so you can
          check the evidence yourself. When a qualified professional has
          reviewed an article for accuracy and safety, they are named
          separately as the reviewer — we never present a reviewer as the
          author, or the other way round.
        </p>
        <h2>What you can expect from our writers</h2>
        <ul>
          <li>
            A direct answer to your question near the top of every article.
          </li>
          <li>
            Claims backed by research or guidance from recognised health
            organisations, with sources listed.
          </li>
          <li>
            Indian foods, portions and examples wherever they are relevant.
          </li>
          <li>
            No cure claims or medication advice — and a clear note when you
            should speak to a professional.
          </li>
        </ul>
        <p>
          Each profile lists the articles that person has written or reviewed.
          Spotted an error in one of them? Our{" "}
          <Link href="/corrections">corrections policy</Link> explains how to
          report it.
        </p>
      </section>

      <ul className="mt-12 space-y-3 text-sm text-muted-foreground">
        <li>
          <Link href="/editorial-policy" className="text-primary underline">
            Editorial policy
          </Link>{" "}
          — how we research and update content
        </li>
        <li>
          <Link href="/medical-disclaimer" className="text-primary underline">
            Medical disclaimer
          </Link>{" "}
          — educational framing only
        </li>
        <li>
          <Link href="/about" className="text-primary underline">
            About fitlives
          </Link>
        </li>
      </ul>
    </main>
  );
}
