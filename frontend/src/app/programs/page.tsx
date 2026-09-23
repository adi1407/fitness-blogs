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
  const { hub } = await fetchKnowledgeSection("programs");
  const title = hub?.metaTitle || hub?.title || "Training Programs";
  const description =
    hub?.metaDescription ||
    hub?.excerpt ||
    "Simple progressive training programs you can stick to.";
  return {
    title,
    description,
    alternates: { canonical: "/programs" },
    openGraph: { title: `${title} | fitlives`, description, url: "/programs" },
  };
}

export default async function ProgramsPage() {
  const { hub, pages } = await fetchKnowledgeSection("programs");

  return (
    <main className="fk-page flex-1 py-16">
      <KnowledgeBreadcrumbs
        items={[{ href: "/", label: "Home" }, { label: "Programs" }]}
      />

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {hub?.title ?? "Training programs"}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        {hub?.excerpt ??
          "Progressive plans built for real schedules — not perfect spreadsheets."}
      </p>

      {hub?.bodyHtml ? <ProseHtml html={hub.bodyHtml} /> : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/exercises"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Exercise library
        </Link>
        <Link
          href="/muscle-building"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
        >
          Muscle building
        </Link>
      </div>

      {pages.length > 0 ? (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {pages.map((p) => (
            <li key={p.id}>
              <Link
                href={p.path ?? `/programs/${p.slug}`}
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
