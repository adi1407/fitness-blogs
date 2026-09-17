import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How FitKnowledge researches, reviews, updates, and corrects fitness and nutrition content.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">
        Editorial policy
      </h1>
      <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Our goal is helpful, searchable, evidence-informed fitness content —
          not clickbait or medical promises.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-foreground">
          Standards
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Prefer primary research and reputable health organizations</li>
          <li>Separate opinion, consensus, and uncertainty clearly</li>
          <li>Update pages when guidance materially changes</li>
          <li>Correct factual errors promptly when reported</li>
          <li>Disclose conflicts of interest when relevant</li>
        </ul>
        <h2 className="pt-4 text-xl font-semibold text-foreground">
          Product approach
        </h2>
        <p>
          We build topic clusters (nutrition, weight loss, muscle, exercises,
          foods, tools) so readers can move from a question to a calculator,
          then to foods or training — a knowledge platform, not a thin blog.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <Link href="/about" className="text-primary underline">
          About
        </Link>
        <Link href="/medical-disclaimer" className="text-primary underline">
          Medical disclaimer
        </Link>
        <Link href="/authors" className="text-primary underline">
          Authors
        </Link>
      </div>
    </main>
  );
}
