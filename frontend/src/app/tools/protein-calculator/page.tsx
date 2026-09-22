import type { Metadata } from "next";
import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { ProteinCalculatorForm } from "@/features/tools/components/ProteinCalculatorForm";

export const metadata: Metadata = {
  title: "Protein Calculator — How Much Protein Do You Need Per Day?",
  description:
    "Free protein calculator by body weight and goal (general health, fat loss, muscle). Get a daily gram estimate, then explore foods and guides.",
  alternates: { canonical: "/tools/protein-calculator" },
  openGraph: {
    title: "Protein Calculator | fitlives",
    description:
      "Estimate daily protein needs and continue into Indian foods and guides.",
    url: "/tools/protein-calculator",
  },
};

export default function ProteinCalculatorPage() {
  return (
    <CalculatorPageShell
      slug="protein-calculator"
      title="Protein calculator"
      description="Get a practical daily protein estimate from body weight and goal, then use foods and guides to hit the target."
      form={<ProteinCalculatorForm />}
      howItWorks={
        <>
          <p>
            The calculator multiplies body weight (kg) by a goal-based factor
            commonly used in fitness education ranges. It is not a clinical
            prescription. People with kidney disease or other medical conditions
            should follow clinician guidance.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>General health ≈ 1.2 g/kg</li>
            <li>Fat loss ≈ 1.8 g/kg</li>
            <li>Muscle building ≈ 2.0 g/kg</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "Should I eat the exact gram number every day?",
          a: "No. Treat it as a daily average. Hitting your range across the week matters more than perfection on any single day.",
        },
        {
          q: "Do I need protein powder?",
          a: "Not required. Food first — powder is optional convenience when whole-food targets are hard to hit.",
        },
      ]}
    />
  );
}
