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
