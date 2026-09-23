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
  const { pages } = await fetchKnowledgeSection("programs");
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchKnowledgePage("programs", slug);
  if (!data) return { title: "Program" };
  const { page } = data;
  const title = page.metaTitle || page.title;
  const description = page.metaDescription || page.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/programs/${slug}` },
    openGraph: {
      title: `${title} | fitlives`,
      description,
      url: `/programs/${slug}`,
    },
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await fetchKnowledgePage("programs", slug);
  if (!data) notFound();
  const { page, related } = data;

  return (
    <main className="fk-page flex-1 py-16">
      <KnowledgeBreadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/programs", label: "Programs" },
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
          href="/exercises"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Browse exercises
        </Link>
        <Link
          href="/training"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
        >
          Training fundamentals
        </Link>
      </div>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-2xl font-semibold">More programs</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((p) => (
              <li key={p.id}>
                <Link
                  href={p.path ?? `/programs/${p.slug}`}
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
