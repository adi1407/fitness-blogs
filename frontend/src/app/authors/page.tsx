import type { Metadata } from "next";
import Link from "next/link";
import { AuthorsFlipCards } from "@/features/about/components/AuthorsFlipCards";
import TailwindImageAccordion from "@/components/ui/tailwind-image-accordion";

export const metadata: Metadata = {
  title: "Authors & Reviewers — FitKnowledge EEAT",
  description:
    "Meet the FitKnowledge editorial and review roles behind nutrition, training, and calculator content.",
  alternates: { canonical: "/authors" },
};

export default function AuthorsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-primary">
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
        EEAT starts with clear ownership. Written by, reviewed by, and fact-checked
        roles will expand as the CMS author profiles ship — placeholders below
        show the editorial model.
      </p>

      <div className="mt-10">
        <TailwindImageAccordion />
      </div>

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
            About FitKnowledge
          </Link>
        </li>
      </ul>
    </main>
  );
}
