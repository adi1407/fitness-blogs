import type { Metadata } from "next";
import Link from "next/link";

/**
 * Shared metadata for IA scaffolds that are not ready to rank.
 */
export const noIndexMetadata = (title: string, description: string): Metadata => ({
  title,
  description,
  robots: { index: false, follow: false },
});

type HubProps = {
  title: string;
  description: string;
  links?: { href: string; label: string }[];
};

/** Temporary hub shell — replace with real curated content before indexing. */
export function PlatformHub({ title, description, links = [] }: HubProps) {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm text-muted-foreground">Platform scaffold · not indexed yet</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
        {description}
      </p>
      {links.length > 0 ? (
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg border border-border bg-card px-4 py-3 text-foreground transition-colors hover:border-primary hover:bg-brand-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}
