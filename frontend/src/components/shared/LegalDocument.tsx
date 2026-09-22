import type { ReactNode } from "react";
import Link from "next/link";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";

export type LegalTocItem = { id: string; label: string };

type Related = { href: string; label: string };

type Props = {
  title: string;
  intro?: string;
  lastUpdated?: string;
  toc: LegalTocItem[];
  related?: Related[];
  children: ReactNode;
};

/**
 * Shared layout for public legal / trust documents.
 * These pages are educational-site policy templates, not licensed legal advice.
 */
export function LegalDocument({
  title,
  intro,
  lastUpdated = LEGAL_LAST_UPDATED,
  toc,
  related = [],
  children,
}: Props) {
  return (
    <main className="fk-page fk-page--content flex-1 py-16">
      <p className="fk-meta text-muted-foreground">Legal · Trust</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{title}</h1>
      {intro ? (
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {intro}
        </p>
      ) : null}
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated: {lastUpdated}
      </p>

      <aside className="fk-disclaimer mt-6 max-w-3xl text-sm leading-relaxed">
        These pages describe how fitlives operates. They are written
        carefully for an educational fitness site, but they are{" "}
        <strong>not a substitute for advice from a licensed lawyer</strong> in
        your jurisdiction. If something here conflicts with applicable law, the
        law controls.
      </aside>

      {toc.length > 0 ? (
        <nav
          aria-label="On this page"
          className="mt-8 max-w-3xl rounded-2xl border border-border bg-muted/40 p-4 sm:p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            On this page
          </p>
          <ol className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {toc.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-foreground/80 hover:text-accent hover:underline"
                >
                  {i + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div className="legal-prose mt-10 max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
        {children}
      </div>

      {related.length > 0 ? (
        <nav className="mt-12 flex flex-wrap gap-3 text-sm" aria-label="Related policies">
          {related.map((item) => (
            <Link key={item.href} href={item.href} className="fk-link">
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </main>
  );
}

export function LegalH2({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 pt-8 text-xl font-semibold text-foreground"
    >
      {children}
    </h2>
  );
}

export function LegalUl({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5">{children}</ul>;
}
