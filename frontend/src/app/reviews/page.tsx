import type { Metadata } from "next";
import Link from "next/link";
import {
  KnowledgeBreadcrumbs,
  KnowledgeDisclaimer,
  ProseHtml,
} from "@/features/knowledge/components/KnowledgeUi";
import { fetchKnowledgeSection } from "@/lib/api/knowledge";

export const revalidate = 120;

export async function generateMetadata(): Promise<Metadata> {
  const { hub } = await fetchKnowledgeSection("reviews");
  const title = hub?.metaTitle || hub?.title || "Buyer's Guides & Reviews";
  const description =
    hub?.metaDescription ||
    hub?.excerpt ||
    "How to evaluate fitness products without falling for hype.";
  return {
    title,
    description,
    alternates: { canonical: "/reviews" },
    openGraph: { title: `${title} | fitlives`, description, url: "/reviews" },
  };
}

export default async function ReviewsPage() {
  const { hub, pages } = await fetchKnowledgeSection("reviews");

  return (
    <main className="fk-page flex-1 py-16">
      <KnowledgeBreadcrumbs
        items={[{ href: "/", label: "Home" }, { label: "Reviews" }]}
      />

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {hub?.title ?? "Buyer's guides & reviews"}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        {hub?.excerpt ??
          "Criteria and red flags so you can judge products yourself."}
      </p>

      {hub?.bodyHtml ? <ProseHtml html={hub.bodyHtml} /> : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/nutrition"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Nutrition hub
        </Link>
        <Link
          href="/affiliate-disclosure"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
        >
          Affiliate disclosure
        </Link>
      </div>

      {pages.length > 0 ? (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {pages.map((p) => (
            <li key={p.id}>
              <Link
                href={p.path ?? `/reviews/${p.slug}`}
                className="block h-full rounded-xl border border-border bg-card p-5 hover:border-accent hover:bg-accent-soft/40"
              >
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <KnowledgeDisclaimer />
    </main>
  );
}
