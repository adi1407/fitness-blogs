import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/features/shared/components/FaqAccordion";
import { CalcOpenBeacon } from "@/features/tools/components/CalcOpenBeacon";
import type { LinkItem } from "@/features/tools/content/links";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export type CalculatorSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

export type CalculatorContent = {
  sections: CalculatorSection[];
  example?: { heading: string; body: ReactNode };
  methodology: ReactNode;
  sources: { label: string; href: string }[];
  faq: { q: string; a: string }[];
  related: { calculators: LinkItem[]; articles: LinkItem[] };
  /** ISO date (YYYY-MM-DD) the page content was last reviewed. */
  updated: string;
};

type Props = {
  slug: string;
  /** H1 — the exact tool name. */
  title: string;
  /** One-sentence promise shown under the H1. */
  intro: string;
  /** Used for WebApplication schema. */
  description: string;
  form: ReactNode;
  content: CalculatorContent;
};

const BODY =
  "space-y-4 text-[15px] leading-relaxed text-foreground/85 sm:text-base [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:decoration-[#FF9800]/50 [&_a]:underline-offset-4 [&_a:hover]:decoration-[#FF9800] [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5";

function formatUpdated(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
}

/** Simple responsive data table for calculator content. */
export function CalcTable({
  caption,
  head,
  rows,
}: {
  caption?: string;
  head: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table
        className={`w-full border-collapse overflow-hidden rounded-xl border border-border text-left text-[13px] sm:text-sm ${head.length > 3 ? "min-w-[32rem]" : ""}`}
      >
        {caption ? (
          <caption className="mb-2 text-left text-xs text-muted-foreground">
            {caption}
          </caption>
        ) : null}
        <thead className="bg-muted/60">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-2.5 py-2.5 align-bottom font-semibold text-foreground sm:px-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={
                    j === 0
                      ? "px-2.5 py-2.5 align-top font-medium text-foreground sm:px-3"
                      : "px-2.5 py-2.5 align-top tabular-nums text-foreground/80 sm:px-3"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LinkCards({ items }: { items: LinkItem[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex h-full items-start justify-between gap-3 rounded-xl border border-border bg-white p-4 transition hover:border-[#0A0A0A] focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none"
          >
            <span>
              <span className="block text-sm font-semibold text-foreground">
                {item.title}
              </span>
              {item.description ? (
                <span className="mt-1 block text-xs text-muted-foreground">
                  {item.description}
                </span>
              ) : null}
            </span>
            <ArrowRight
              className="mt-0.5 size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-[#FF9800]"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function CalculatorPageShell({
  slug,
  title,
  intro,
  description,
  form,
  content,
}: Props) {
  const path = `/tools/${slug}`;
  const url = `${siteUrl}${path}`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    url,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description,
    dateModified: content.updated,
    publisher: { "@type": "Organization", name: "fitlives", url: siteUrl },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };
  const faqLd =
    content.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  const toc = [
    ...content.sections.map((s) => ({ id: s.id, heading: s.heading })),
    ...(content.example ? [{ id: "worked-example", heading: content.example.heading }] : []),
    { id: "how-we-calculate", heading: "How this calculator works" },
    ...(content.faq.length > 0 ? [{ id: "faq", heading: "Frequently asked questions" }] : []),
  ];

  return (
    <main className="fk-page fk-page--content flex-1 py-10 sm:py-16">
      <CalcOpenBeacon tool={slug} />
      <JsonLd data={appLd} />
      <JsonLd data={breadcrumbLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="fk-link-muted">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/tools" className="fk-link-muted">
              Tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">{intro}</p>
      <p className="mt-3 text-xs text-muted-foreground">
        By the{" "}
        <Link href="/editorial-policy" className="fk-link-muted font-medium">
          fitlives editorial team
        </Link>{" "}
        · Updated <time dateTime={content.updated}>{formatUpdated(content.updated)}</time>
      </p>

      <div className="mt-6 sm:mt-8">{form}</div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
        <article className="min-w-0 space-y-12">
          {content.sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight text-balance">{s.heading}</h2>
              <div className={`mt-4 ${BODY}`}>{s.body}</div>
            </section>
          ))}

          {content.example ? (
            <section id="worked-example" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight text-balance">
                {content.example.heading}
              </h2>
              <div className={`mt-4 rounded-2xl border border-border bg-brand-50/50 p-5 sm:p-6 ${BODY}`}>
                {content.example.body}
              </div>
            </section>
          ) : null}

          <section id="how-we-calculate" className="scroll-mt-28">
            <h2 className="text-2xl font-semibold tracking-tight">How this calculator works</h2>
            <div className={`mt-4 ${BODY}`}>{content.methodology}</div>
            {content.sources.length > 0 ? (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Sources
                </h3>
                <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-foreground/80">
                  {content.sources.map((src) => (
                    <li key={src.href}>
                      <a
                        href={src.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fk-link"
                      >
                        {src.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </section>

          {content.faq.length > 0 ? (
            <div id="faq" className="scroll-mt-28">
              <FaqAccordion
                variant="stacked"
                items={content.faq.map((item) => ({
                  question: item.q,
                  answer: item.a,
                }))}
                title="Frequently asked questions"
                subtitle="Straight answers about this calculator. Educational only — not medical advice."
              />
            </div>
          ) : null}

          <section aria-labelledby="related-calculators">
            <h2 id="related-calculators" className="text-xl font-semibold tracking-tight">
              Related calculators
            </h2>
            <div className="mt-4">
              <LinkCards items={content.related.calculators} />
            </div>
          </section>

          {content.related.articles.length > 0 ? (
            <section aria-labelledby="related-guides">
              <h2 id="related-guides" className="text-xl font-semibold tracking-tight">
                Guides to read next
              </h2>
              <div className="mt-4">
                <LinkCards items={content.related.articles} />
              </div>
            </section>
          ) : null}

          <p className="rounded-xl border border-accent/30 bg-[#FFF8E1] px-4 py-3 text-xs leading-relaxed text-foreground/80">
            This calculator provides an estimate and isn&apos;t a substitute for
            individualised medical or dietary advice. Read our{" "}
            <Link href="/medical-disclaimer" className="fk-link">
              medical disclaimer
            </Link>{" "}
            and{" "}
            <Link href="/editorial-policy" className="fk-link">
              editorial policy
            </Link>
            .
          </p>
        </article>

        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-[calc(var(--site-header-height,4rem)+1.5rem)]">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              On this page
            </p>
            <ol className="mt-3 space-y-2 border-l border-border text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="-ml-px block border-l border-transparent pl-3 text-muted-foreground transition hover:border-[#FF9800] hover:text-foreground"
                  >
                    {item.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>
    </main>
  );
}
