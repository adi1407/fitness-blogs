import type { Metadata } from "next";
import Link from "next/link";
import { AboutRadialIntro } from "@/features/about/components/AboutRadialIntro";

export const metadata: Metadata = {
  title: "About FitKnowledge — Editorial Fitness Platform",
  description:
    "Why FitKnowledge exists: evidence-informed fitness and nutrition content, calculators, databases, and transparent editorial standards.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">About FitKnowledge</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        FitKnowledge is a searchable fitness knowledge platform — articles,
        guides, calculators, foods, and exercises — designed to answer real
        questions better than a thin blog post.
      </p>

      <AboutRadialIntro />

      <h2 className="mt-10 text-2xl font-semibold">Editorial philosophy</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
        <li>Search intent first, keywords second</li>
        <li>Cite reputable sources for health and nutrition claims</li>
        <li>Prefer educational framing over medical promises</li>
        <li>Build topic clusters that interconnect with tools and databases</li>
        <li>Highlight Indian nutrition context as a differentiator</li>
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/editorial-policy" className="text-primary underline">
          Editorial policy
        </Link>
        <Link href="/medical-disclaimer" className="text-primary underline">
          Medical disclaimer
        </Link>
        <Link href="/authors" className="text-primary underline">
          Authors
        </Link>
        <Link href="/contact" className="text-primary underline">
          Contact
        </Link>
      </div>
    </main>
  );
}
