import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalDocument,
  LegalH2,
  LegalUl,
} from "@/components/shared/LegalDocument";
import { LEGAL_RELATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "fitlives currently has no paid affiliate links. If that changes, we will disclose it here.",
  alternates: { canonical: "/affiliate-disclosure" },
};

const toc = [
  { id: "current", label: "Current status" },
  { id: "if-changes", label: "If we add affiliates" },
  { id: "health", label: "No product prescriptions" },
];

export default function AffiliateDisclosurePage() {
  return (
    <LegalDocument
      title="Affiliate Disclosure"
      intro="Honesty about money: whether we earn commission when you click a product or program link."
      toc={toc}
      related={[
        LEGAL_RELATED.editorial,
        LEGAL_RELATED.terms,
        LEGAL_RELATED.medical,
        LEGAL_RELATED.contact,
      ]}
    >
      <LegalH2 id="current">1. Current status</LegalH2>
      <p>
        As of the date above, fitlives <strong>does not</strong> use paid
        affiliate links, sponsored product placements, or commission-based
        shopping widgets. Calculators, food pages, and articles are
        educational. If a page mentions a food, supplement category, or
        training method, that is not a paid endorsement unless we clearly
        label it otherwise.
      </p>

      <LegalH2 id="if-changes">2. If we add affiliates later</LegalH2>
      <p>If we ever participate in affiliate programs, we will:</p>
      <LegalUl>
        <li>Update this page and the “Last updated” date.</li>
        <li>
          Disclose material connections on the relevant page (for example
          “we may earn a commission”).
        </li>
        <li>
          Keep editorial judgment independent of commission — we will not
          invent medical claims to sell a product.
        </li>
      </LegalUl>

      <LegalH2 id="health">3. No product prescriptions</LegalH2>
      <p>
        Even if a future affiliate link appears, fitlives will not tell
        you to take a drug, stop a medication, or treat a disease. See the{" "}
        <Link href="/medical-disclaimer" className="fk-link">
          Medical Disclaimer
        </Link>{" "}
        and{" "}
        <Link href="/editorial-policy" className="fk-link">
          Editorial Policy
        </Link>
        .
      </p>
    </LegalDocument>
  );
}
