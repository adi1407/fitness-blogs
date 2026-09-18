import type { ReactNode } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqScrollerBlock } from "@/features/shared/components/FaqScrollerBlock";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type Props = {
  slug: string;
  title: string;
  description: string;
  howItWorks: ReactNode;
  form: ReactNode;
  faq?: { q: string; a: string }[];
};

export function CalculatorPageShell({
  slug,
  title,
  description,
  howItWorks,
  form,
  faq = [],
}: Props) {
  const path = `/tools/${slug}`;
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    url: `${siteUrl}${path}`,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${siteUrl}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${siteUrl}${path}`,
      },
    ],
  };
  const faqLd =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={appLd} />
      <JsonLd data={breadcrumbLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/tools" className="hover:text-primary">
              Tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">{title}</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{description}</p>

      <div className="mt-8">{form}</div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">How this estimate works</h2>
        <div className="mt-4 space-y-3 text-muted-foreground leading-relaxed">
          {howItWorks}
        </div>
      </section>

      {faq.length > 0 ? (
        <FaqScrollerBlock
          className="mt-12 -mx-4 overflow-hidden sm:-mx-6"
          items={faq.map((item) => ({
            question: item.q,
            answer: item.a,
          }))}
          title="FAQs"
          subtitle="Quick answers about this calculator. Educational only — not medical advice."
        />
      ) : null}

      <p className="mt-10 text-xs text-muted-foreground">
        Educational tool only.{" "}
        <Link href="/medical-disclaimer" className="underline">
          Medical disclaimer
        </Link>
        .
      </p>
    </main>
  );
}
