import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact FitKnowledge",
  description:
    "Contact FitKnowledge for corrections, partnerships, media, and support questions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        We welcome corrections, partnership ideas, and feedback that improves
        accuracy for readers.
      </p>
      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">Email</p>
        <a
          href="mailto:hello@fitknowledge.example"
          className="mt-1 block text-lg font-semibold text-primary"
        >
          hello@fitknowledge.example
        </a>
        <p className="mt-4 text-sm text-muted-foreground">
          Replace this placeholder address before launch. For medical
          emergencies, contact local emergency services — we do not provide
          clinical care.
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/editorial-policy" className="text-primary underline">
          Editorial policy
        </Link>
        <Link href="/medical-disclaimer" className="text-primary underline">
          Medical disclaimer
        </Link>
      </div>
    </main>
  );
}
