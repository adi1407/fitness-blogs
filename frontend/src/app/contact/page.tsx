import type { Metadata } from "next";
import Link from "next/link";
import { ContactEmailDialog } from "@/features/contact/components/ContactEmailDialog";
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";

export const metadata: Metadata = {
  title: "Contact FitKnowledge",
  description:
    "Contact FitKnowledge for corrections, partnerships, media, and support questions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden>
        <BubbleBackground interactive={false} className="absolute inset-0" />
      </div>
      <div className="fk-page fk-page--content relative z-10 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We welcome corrections, partnership ideas, and feedback that improves
          accuracy for readers.
        </p>
        <div className="fk-panel mt-8 p-6">
          <p className="text-sm text-muted-foreground">Email</p>
          <a
            href="mailto:hello@fitknowledge.example"
            className="mt-1 block text-lg font-semibold text-foreground"
          >
            hello@fitknowledge.example
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            Replace this placeholder address before launch. For medical
            emergencies, contact local emergency services — we do not provide
            clinical care.
          </p>
          <ContactEmailDialog />
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/editorial-policy" className="fk-link">
            Editorial policy
          </Link>
          <Link href="/medical-disclaimer" className="fk-link">
            Medical disclaimer
          </Link>
        </div>
      </div>
    </main>
  );
}
