import Link from "next/link";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export function KnowledgeDisclaimer() {
  return (
    <aside className="mt-10 rounded-xl border border-[#FF9800]/40 bg-[#FF9800]/10 px-4 py-3 text-sm text-foreground">
      <p className="font-semibold">Educational content</p>
      <p className="mt-1 text-muted-foreground">
        Not medical advice. Form cues and programs are general guidance — stop
        if you feel sharp pain, and consult a qualified professional for
        injuries or health conditions.{" "}
        <Link href="/medical-disclaimer" className="font-medium text-primary underline">
          Medical disclaimer
        </Link>
        .
      </p>
    </aside>
  );
}

type Crumb = BreadcrumbItem;

export function KnowledgeBreadcrumbs({ items }: { items: Crumb[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={ld} />
      <Breadcrumbs items={items} linkClassName="fk-link-muted" />
    </>
  );
}

export function ProseHtml({ html }: { html: string }) {
  return (
    <div
      className="article-body mt-6 max-w-3xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
