import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalDocument,
  LegalH2,
  LegalUl,
} from "@/components/shared/LegalDocument";
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_CONTACT_MAILTO,
  LEGAL_RELATED,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Corrections Policy",
  description:
    "How to request a factual correction on FitKnowledge. We do not provide clinical second opinions.",
  alternates: { canonical: "/corrections" },
};

const toc = [
  { id: "goal", label: "Why corrections matter" },
  { id: "how", label: "How to request one" },
  { id: "what", label: "What we will and will not do" },
  { id: "timing", label: "Timing" },
];

export default function CorrectionsPage() {
  return (
    <LegalDocument
      title="Corrections Policy"
      intro="We want readers to trust FitKnowledge. If you find a factual error, tell us."
      toc={toc}
      related={[
        LEGAL_RELATED.editorial,
        LEGAL_RELATED.contact,
        LEGAL_RELATED.medical,
        LEGAL_RELATED.terms,
      ]}
    >
      <LegalH2 id="goal">1. Why corrections matter</LegalH2>
      <p>
        Fitness and nutrition topics change. We aim to fix material factual
        errors promptly and to distinguish evidence from opinion, as described
        in our{" "}
        <Link href="/editorial-policy" className="fk-link">
          Editorial Policy
        </Link>
        .
      </p>

      <LegalH2 id="how">2. How to request a correction</LegalH2>
      <p>
        Email{" "}
        <a href={LEGAL_CONTACT_MAILTO} className="fk-link">
          {LEGAL_CONTACT_EMAIL}
        </a>{" "}
        with:
      </p>
      <LegalUl>
        <li>The page URL</li>
        <li>The sentence or figure you believe is wrong</li>
        <li>A reliable source (guideline, paper, or official organization) if you have one</li>
      </LegalUl>
      <p>
        Subject line example: “Correction request — [article title]”.
      </p>

      <LegalH2 id="what">3. What we will and will not do</LegalH2>
      <LegalUl>
        <li>
          We will review alleged factual errors in published educational
          content.
        </li>
        <li>
          We may update the page, add a note, or explain why we kept the
          original wording.
        </li>
        <li>
          We <strong>do not</strong> provide a clinical second opinion, interpret
          your lab results, or tell you to change medication.
        </li>
        <li>
          We do not mediate disputes with other websites or social posts.
        </li>
      </LegalUl>

      <LegalH2 id="timing">4. Timing</LegalH2>
      <p>
        We aim to acknowledge correction emails when we reasonably can. There
        is no guaranteed response time. Urgent medical concerns should go to
        a qualified professional or local emergency services, not this inbox.
      </p>
    </LegalDocument>
  );
}
