import type { Metadata } from "next";
import Link from "next/link";
import { AuthorsFlipCards } from "@/features/about/components/AuthorsFlipCards";

export const metadata: Metadata = {
  title: "Authors & Reviewers — fitlives EEAT",
  description:
    "Authors and reviewers for fitlives content. Profiles will appear here as the editorial roster grows.",
  alternates: { canonical: "/authors" },
  robots: { index: false, follow: true },
};

export default function AuthorsPage() {
  return (
    <main className="fk-page flex-1 py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="fk-link-muted">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Authors</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        Authors & reviewers
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        EEAT starts with clear ownership. This page is empty for now — real
        written-by and reviewed-by profiles will list here when they are ready.
      </p>

      <AuthorsFlipCards />

      <ul className="mt-12 space-y-3 text-sm text-muted-foreground">
        <li>
          <Link href="/editorial-policy" className="text-primary underline">
            Editorial policy
          </Link>{" "}
          — how we research and update content
        </li>
        <li>
          <Link href="/medical-disclaimer" className="text-primary underline">
            Medical disclaimer
          </Link>{" "}
          — educational framing only
        </li>
        <li>
          <Link href="/about" className="text-primary underline">
            About fitlives
          </Link>
        </li>
      </ul>
    </main>
  );
}
