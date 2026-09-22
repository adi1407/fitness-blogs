import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalDocument,
  LegalH2,
  LegalUl,
} from "@/components/shared/LegalDocument";
import { LEGAL_RELATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Nutrition Disclaimer",
  description:
    "Food data, macros, and Indian food listings on fitlives are educational estimates — not dietetic care or allergen-certified labels.",
  alternates: { canonical: "/nutrition-disclaimer" },
};

const toc = [
  { id: "not-dietitian", label: "Not dietetic care" },
  { id: "data", label: "Food and macro data" },
  { id: "risk", label: "Higher-risk situations" },
  { id: "allergens", label: "Allergies" },
  { id: "related", label: "Related notices" },
];

export default function NutritionDisclaimerPage() {
  return (
    <LegalDocument
      title="Nutrition Disclaimer"
      intro="How to treat calories, protein, Indian food listings, and meal ideas on this Site."
      toc={toc}
      related={[
        LEGAL_RELATED.medical,
        LEGAL_RELATED.terms,
        LEGAL_RELATED.editorial,
        LEGAL_RELATED.contact,
      ]}
    >
      <LegalH2 id="not-dietitian">1. Not dietetic or clinical care</LegalH2>
      <p>
        Nutrition content is educational. It does{" "}
        <strong>not</strong> create a dietitian–client or nutritionist–client
        relationship. We do not provide personalized medical nutrition
        therapy, meal plans for disease, or supplement prescriptions.
      </p>

      <LegalH2 id="data">2. Food databases and macros are estimates</LegalH2>
      <p>
        Values for Indian foods and other items are approximate. Real meals
        vary by recipe, oil used, brand, serving size, and cooking method.
        Calculator outputs (protein, calories, macros) use simplified models.
        Do not treat them as laboratory analysis or a clinical diet order.
      </p>

      <LegalH2 id="risk">3. Higher-risk situations</LegalH2>
      <p>
        Get in-person professional guidance before using high-protein,
        very-low-calorie, fasting, or aggressive fat-loss approaches if you
        have or suspect:
      </p>
      <LegalUl>
        <li>Kidney disease or reduced kidney function</li>
        <li>Eating disorders or a history of disordered eating</li>
        <li>Pregnancy, trying to conceive, or breastfeeding</li>
        <li>Diabetes, gout, or other metabolic conditions</li>
        <li>Recent surgery, or advice from your clinician to restrict protein or calories</li>
      </LegalUl>

      <LegalH2 id="allergens">4. Allergies and food safety</LegalH2>
      <p>
        We do not certify allergen-free foods. Always read packaging and
        restaurant information. If you have a known allergy or intolerance,
        do not rely on Site listings as a safety check.
      </p>

      <LegalH2 id="related">5. Related notices</LegalH2>
      <p>
        Also read the{" "}
        <Link href="/medical-disclaimer" className="fk-link">
          Medical Disclaimer
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="fk-link">
          Terms of Use
        </Link>
        . For emergencies, contact local emergency services.
      </p>
    </LegalDocument>
  );
}
