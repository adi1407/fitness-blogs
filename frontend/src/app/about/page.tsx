import type { Metadata } from "next";
import Link from "next/link";
import { AboutRadialIntro } from "@/features/about/components/AboutRadialIntro";
import TailwindImageAccordion, {
  type AccordionItem,
} from "@/components/ui/tailwind-image-accordion";

export const metadata: Metadata = {
  title: "About FitKnowledge — Editorial Fitness Platform",
  description:
    "Why FitKnowledge exists: evidence-informed fitness and nutrition content, calculators, databases, and transparent editorial standards.",
  alternates: { canonical: "/about" },
};

const ABOUT_ACCORDION: AccordionItem[] = [
  {
    id: "guides",
    url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=960&auto=format&fit=crop",
    title: "Guides",
    description: "Intent-complete answers",
    href: "/learn",
  },
  {
    id: "tools",
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=960&auto=format&fit=crop",
    title: "Tools",
    description: "Educational calculators",
    href: "/tools",
  },
  {
    id: "databases",
    url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=960&auto=format&fit=crop",
    title: "Databases",
    description: "Foods & exercises",
    href: "/foods/indian",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">About FitKnowledge</h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        FitKnowledge is a searchable fitness knowledge platform — articles,
        guides, calculators, foods, and exercises — designed to answer real
        questions better than a thin blog post.
      </p>

      <AboutRadialIntro />

      <h2 className="mt-12 text-2xl font-semibold">What we build</h2>
      <p className="mt-2 text-muted-foreground">
        Hover a panel to expand — guides, tools, and databases.
      </p>
      <div className="mt-6">
        <TailwindImageAccordion items={ABOUT_ACCORDION} />
      </div>

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
