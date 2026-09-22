import type { Metadata } from "next";
import Link from "next/link";
import { ContactEmailDialog } from "@/features/contact/components/ContactEmailDialog";
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_CONTACT_MAILTO,
  LEGAL_RELATED,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Contact fitlives",
  description:
    "Contact fitlives for corrections, privacy requests, partnerships, and support. Not for medical emergencies.",
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
          Corrections, privacy requests, partnerships, and product feedback
          are welcome. We do not provide clinical care.
        </p>
        <div className="fk-panel mt-8 p-6">
          <p className="text-sm text-muted-foreground">Email</p>
          <a
            href={LEGAL_CONTACT_MAILTO}
            className="mt-1 block text-lg font-semibold text-foreground"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Corrections:</strong> include
              the page URL and what you believe is wrong. See the{" "}
              <Link href="/corrections" className="fk-link">
                Corrections Policy
              </Link>
              .
            </li>
            <li>
              <strong className="text-foreground">Privacy / account:</strong>{" "}
              access, correction, or deletion of your Google-linked member
              data — see the{" "}
              <Link href="/privacy" className="fk-link">
                Privacy Policy
              </Link>
              .
            </li>
            <li>
              <strong className="text-foreground">Legal notices:</strong> Terms
              and policy questions.
            </li>
          </ul>
          <p className="fk-disclaimer mt-6 text-sm leading-relaxed">
            Medical emergencies: contact local emergency services. Do not
            email us for diagnosis, medication advice, or crisis support.
          </p>
          <ContactEmailDialog />
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href={LEGAL_RELATED.editorial.href} className="fk-link">
            {LEGAL_RELATED.editorial.label}
          </Link>
          <Link href={LEGAL_RELATED.medical.href} className="fk-link">
            {LEGAL_RELATED.medical.label}
          </Link>
          <Link href={LEGAL_RELATED.terms.href} className="fk-link">
            {LEGAL_RELATED.terms.label}
          </Link>
          <Link href={LEGAL_RELATED.privacy.href} className="fk-link">
            {LEGAL_RELATED.privacy.label}
          </Link>
        </div>
      </div>
    </main>
  );
}
