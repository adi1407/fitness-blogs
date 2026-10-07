import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/features/blog/components/ArticleCard";
import { fetchAuthor } from "@/features/authors/api/authors";
import { ORG_REF, OG_DEFAULTS, absoluteUrl, breadcrumbLd } from "@/lib/seo";

export const revalidate = 300;

type PageProps = { params: Promise<{ slug: string }> };

function describe(name: string, bio: string): string {
  const fallback = `Guides on nutrition, weight loss and muscle building written by ${name} for fitlives, with sources for every article.`;
  const text = bio.trim() || fallback;
  return text.length <= 160 ? text : `${text.slice(0, 157).trimEnd()}...`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = await fetchAuthor(slug);
  if (!profile) return { title: "Author not found", robots: { index: false } };

  const { author } = profile;
  const title = `${author.name}, fitlives Author`;
  const description = describe(author.name, author.bio);
  return {
    title,
    description,
    alternates: { canonical: `/authors/${author.slug}` },
    openGraph: {
      ...OG_DEFAULTS,
      type: "profile",
      title: `${title} | fitlives`,
      description,
      url: `/authors/${author.slug}`,
    },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = await fetchAuthor(slug);
  if (!profile) notFound();

  const { author, written, reviewed } = profile;
  const path = `/authors/${author.slug}`;

  const profileLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(path),
    inLanguage: "en-IN",
    mainEntity: {
      "@type": "Person",
      "@id": `${absoluteUrl(path)}#person`,
      name: author.name,
      url: absoluteUrl(path),
      ...(author.bio ? { description: author.bio } : {}),
      ...(author.credentials ? { jobTitle: author.credentials } : {}),
      worksFor: ORG_REF,
      knowsAbout: ["Nutrition", "Weight loss", "Muscle building", "Indian diet"],
    },
  };

  return (
    <main className="fk-page flex-1 py-16">
      <JsonLd data={profileLd} />
      <JsonLd
        data={breadcrumbLd([
          ["Home", "/"],
          ["Authors", "/authors"],
          [author.name, path],
        ])}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="fk-link-muted">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/authors" className="fk-link-muted">
              Authors
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">{author.name}</li>
        </ol>
      </nav>

      <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
        <span
          aria-hidden="true"
          className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary text-3xl font-semibold text-primary-foreground"
        >
          {author.name.trim().charAt(0).toUpperCase()}
        </span>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">{author.name}</h1>
          {author.credentials ? (
            <p className="mt-1 text-muted-foreground">{author.credentials}</p>
          ) : null}
        </div>
      </header>

      {author.bio ? (
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {author.bio}
        </p>
      ) : null}

      {written.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">
            Articles by {author.name}
          </h2>
          <div className="mt-4 divide-y divide-border border-t border-border">
            {written.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      {reviewed.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">
            Articles reviewed by {author.name}
          </h2>
          <div className="mt-4 divide-y divide-border border-t border-border">
            {reviewed.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      <p className="mt-12 text-sm text-muted-foreground">
        Read how we research, write and update guides in our{" "}
        <Link href="/editorial-policy" className="fk-link">
          editorial policy
        </Link>
        .
      </p>
    </main>
  );
}
