import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalDocument,
  LegalH2,
  LegalUl,
} from "@/components/shared/LegalDocument";
import { LEGAL_RELATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How FitKnowledge uses essential storage and OpenPanel analytics. We do not currently run advertising pixels.",
  alternates: { canonical: "/cookie-policy" },
};

const toc = [
  { id: "what", label: "What we use" },
  { id: "essential", label: "Essential" },
  { id: "analytics", label: "Analytics" },
  { id: "ads", label: "Advertising" },
  { id: "control", label: "How to control" },
];

export default function CookiePolicyPage() {
  return (
    <LegalDocument
      title="Cookie Policy"
      intro="This page explains cookies and similar storage used on FitKnowledge. Read it with our Privacy Policy."
      toc={toc}
      related={[LEGAL_RELATED.privacy, LEGAL_RELATED.terms, LEGAL_RELATED.contact]}
    >
      <LegalH2 id="what">1. What this covers</LegalH2>
      <p>
        “Cookies” here includes HTTP cookies, local storage, and similar
        technologies that remember a preference or measure a visit.
      </p>

      <LegalH2 id="essential">2. Essential / functional</LegalH2>
      <LegalUl>
        <li>
          <strong>Member session</strong> — if you sign in with Google, we
          store a session token in the browser (currently local storage) so
          we can show your account and honor upvotes/bookmarks. This is
          needed for those features to work.
        </li>
        <li>
          Hosting and security systems may set strictly necessary cookies
          (for example to route traffic or mitigate abuse).
        </li>
      </LegalUl>

      <LegalH2 id="analytics">3. Analytics (OpenPanel)</LegalH2>
      <p>
        We use OpenPanel to understand which pages and tools are used (for
        example article views and share events). This helps us improve
        content quality. Analytics data is used for operating the Site, not
        for selling your identity to advertisers.
      </p>
      <p>
        OpenPanel may use cookies or similar identifiers according to their
        product. See{" "}
        <a
          href="https://openpanel.dev"
          className="fk-link"
          rel="noopener noreferrer"
          target="_blank"
        >
          OpenPanel
        </a>{" "}
        for vendor documentation.
      </p>

      <LegalH2 id="ads">4. Advertising cookies</LegalH2>
      <p>
        We do <strong>not</strong> currently run third-party advertising
        pixels, remarketing tags, or affiliate tracking cookies. If that
        changes, we will update this policy and the{" "}
        <Link href="/affiliate-disclosure" className="fk-link">
          Affiliate Disclosure
        </Link>
        .
      </p>

      <LegalH2 id="control">5. How to control</LegalH2>
      <LegalUl>
        <li>
          Browser settings can block or delete cookies and site data. Blocking
          all storage may break sign-in.
        </li>
        <li>
          Signing out and clearing site data for this domain removes the
          local session token.
        </li>
        <li>
          You can use browser “do not track” or tracker-blocking extensions;
          we do not currently offer a separate in-app analytics opt-out
          toggle.
        </li>
      </LegalUl>
    </LegalDocument>
  );
}
