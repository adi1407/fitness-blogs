import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProteinCalculatorForm } from "@/features/tools/components/ProteinCalculatorForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Protein Calculator — How Much Protein Do You Need Per Day?",
  description:
    "Free protein calculator by body weight and goal (general health, fat loss, muscle). Get a daily gram estimate, then explore foods and guides.",
  alternates: { canonical: "/tools/protein-calculator" },
  openGraph: {
    title: "Protein Calculator | FitKnowledge",
    description:
      "Estimate daily protein needs and continue into Indian foods and guides.",
    url: "/tools/protein-calculator",
  },
};

export default function ProteinCalculatorPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Protein Calculator",
    url: `${siteUrl}/tools/protein-calculator`,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Estimate daily protein needs based on body weight and fitness goal.",
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
        name: "Protein Calculator",
        item: `${siteUrl}/tools/protein-calculator`,
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={appLd} />
      <JsonLd data={breadcrumbLd} />

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
          <li className="text-foreground">Protein Calculator</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        Protein calculator
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Get a practical daily protein estimate from body weight and goal, then
        use foods and guides to hit the target.
      </p>

      <div className="mt-8">
        <ProteinCalculatorForm />
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">How this estimate works</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          The calculator multiplies body weight (kg) by a goal-based factor
          commonly used in fitness education ranges. It is not a clinical
          prescription. People with kidney disease or other medical conditions
          should follow clinician guidance.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>General health ≈ 1.2 g/kg</li>
          <li>Fat loss ≈ 1.8 g/kg</li>
          <li>Muscle building ≈ 2.0 g/kg</li>
        </ul>
      </section>

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
