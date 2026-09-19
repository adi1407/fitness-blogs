import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description:
    "FitKnowledge provides educational fitness and nutrition information only — not medical advice, diagnosis, or treatment.",
  alternates: { canonical: "/medical-disclaimer" },
};

export default function MedicalDisclaimerPage() {
  return (
    <main className="fk-page fk-page--content flex-1 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">
        Medical disclaimer
      </h1>
      <div className="fk-disclaimer mt-6 space-y-4 leading-relaxed">
        <p>
          Content on FitKnowledge — including articles, calculators, food data,
          and exercise guidance — is for educational purposes only. It is not
          medical advice and does not create a doctor–patient relationship.
        </p>
        <p>
          Always seek the advice of a qualified health professional with any
          questions about a medical condition, diet, or exercise program.
          Never disregard professional medical advice or delay seeking it
          because of something you read on this site.
        </p>
        <p>
          Calculator outputs are estimates based on simplified models. Individual
          needs vary. If you have kidney disease, eating disorders, pregnancy,
          or other conditions, get personalized clinical guidance before using
          high-protein or calorie-restricted approaches.
        </p>
      </div>
      <Link href="/contact" className="fk-link mt-8 inline-block">
        Contact us
      </Link>
    </main>
  );
}
