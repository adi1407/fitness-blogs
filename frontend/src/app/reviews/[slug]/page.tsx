import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  KnowledgeBreadcrumbs,
  KnowledgeDisclaimer,
  ProseHtml,
} from "@/features/knowledge/components/KnowledgeUi";
import {
  fetchKnowledgePage,
  fetchKnowledgeSection,
} from "@/lib/api/knowledge";

export const revalidate = 120;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { pages } = await fetchKnowledgeSection("reviews");
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchKnowledgePage("reviews", slug);
  if (!data) return { title: "Review" };
  const { page } = data;
  const title = page.metaTitle || page.title;
  const description = page.metaDescription || page.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/reviews/${slug}` },
    openGraph: {
      title: `${title} | fitlives`,
      description,
      url: `/reviews/${slug}`,
    },
  };
}

export default async function ReviewDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await fetchKnowledgePage("reviews", slug);
  if (!data) notFound();
  const { page, related } = data;

  return (
    <main className="fk-page flex-1 py-16">
      <KnowledgeBreadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/reviews", label: "Reviews" },
          { label: page.title },
        ]}
      />

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {page.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        {page.excerpt}
      </p>

      <ProseHtml html={page.bodyHtml} />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/reviews"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
        >
          All guides
        </Link>
        <Link
          href="/affiliate-disclosure"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
        >
          Affiliate disclosure
        </Link>
      </div>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-2xl font-semibold">Related guides</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((p) => (
              <li key={p.id}>
                <Link
                  href={p.path ?? `/reviews/${p.slug}`}
                  className="block rounded-lg border border-border px-4 py-3 hover:border-accent"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <KnowledgeDisclaimer />
    </main>
  );
}
