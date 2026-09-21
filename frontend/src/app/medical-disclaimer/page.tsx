import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalDocument,
  LegalH2,
  LegalUl,
} from "@/components/shared/LegalDocument";
import { LEGAL_RELATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description:
    "FitKnowledge provides educational fitness and nutrition information only — not medical advice, diagnosis, treatment, or emergency care.",
  alternates: { canonical: "/medical-disclaimer" },
};

const toc = [
  { id: "not-advice", label: "Not medical advice" },
  { id: "emergency", label: "Emergencies" },
  { id: "scope", label: "What this covers" },
  { id: "risk", label: "Who should be extra careful" },
  { id: "tools", label: "Calculators and databases" },
  { id: "links", label: "Third-party links" },
  { id: "more", label: "Related pages" },
];

export default function MedicalDisclaimerPage() {
  return (
    <LegalDocument
      title="Medical Disclaimer"
      intro="Read this before using articles, calculators, food data, or exercise guidance on FitKnowledge."
      toc={toc}
      related={[
        LEGAL_RELATED.nutrition,
        LEGAL_RELATED.terms,
        LEGAL_RELATED.editorial,
        LEGAL_RELATED.contact,
      ]}
    >
      <LegalH2 id="not-advice">1. Educational information only</LegalH2>
      <p>
        Content on FitKnowledge is for <strong>general education</strong>. It
        is <strong>not</strong> medical advice, diagnosis, or treatment. It
        does <strong>not</strong> create a doctor–patient, therapist–client,
        or other professional relationship with you.
      </p>
      <p>
        Always seek the advice of a qualified health professional with
        questions about a medical condition, diet, supplement, or exercise
        program. Never disregard professional medical advice or delay seeking
        it because of something you read on this Site. We do not tell you to
        start, stop, or change prescription medication.
      </p>

      <LegalH2 id="emergency">2. Emergencies</LegalH2>
      <p>
        If you think you are having a medical emergency (including chest
        pain, trouble breathing, severe injury, fainting, or thoughts of
        self-harm), contact <strong>local emergency services immediately</strong>.
        Do not email FitKnowledge for emergency care. We cannot provide
        clinical or crisis services.
      </p>

      <LegalH2 id="scope">3. What this notice covers</LegalH2>
      <LegalUl>
        <li>Articles, guides, FAQs, and hub pages</li>
        <li>Calculators (protein, TDEE, calories, macros, BMR, BMI, and similar)</li>
        <li>Food listings, including Indian foods and macro estimates</li>
        <li>Exercise library and training descriptions</li>
        <li>User features such as bookmarks, upvotes, and share tools</li>
      </LegalUl>

      <LegalH2 id="risk">4. Who should be extra careful</LegalH2>
      <p>
        Get personalized clinical guidance before using high-protein,
        calorie-restricted, or intense training approaches if you are
        pregnant; have kidney disease, heart disease, diabetes, or an eating
        disorder; are recovering from injury or surgery; or have been told by
        a clinician to limit exercise or diet changes.
      </p>

      <LegalH2 id="tools">5. Calculators, foods, and exercises</LegalH2>
      <p>
        Calculator outputs are estimates from simplified models, not medical
        devices. Food values are approximate. Exercise descriptions cannot
        replace in-person coaching; improper form can cause injury. You use
        this information at your own risk.
      </p>
      <p>
        See also the{" "}
        <Link href="/nutrition-disclaimer" className="fk-link">
          Nutrition Disclaimer
        </Link>
        .
      </p>

      <LegalH2 id="links">6. Third-party links</LegalH2>
      <p>
        We may link to research, public-health pages, or share windows
        (X, Facebook, LinkedIn, WhatsApp). We are not responsible for their
        content, availability, or privacy practices.
      </p>

      <LegalH2 id="more">7. Related pages</LegalH2>
      <p>
        Use of the Site is also governed by our{" "}
        <Link href="/terms" className="fk-link">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="fk-link">
          Privacy Policy
        </Link>
        .
      </p>
    </LegalDocument>
  );
}
