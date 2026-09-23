import Link from "next/link";

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

type Crumb = { href?: string; label: string };

export function KnowledgeBreadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="fk-link-muted">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ProseHtml({ html }: { html: string }) {
  return (
    <div
      className="prose prose-neutral mt-6 max-w-none prose-p:leading-relaxed prose-a:text-primary"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
