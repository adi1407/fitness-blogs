"use client";

import { FaqScrollerBlock } from "@/features/shared/components/FaqScrollerBlock";

const HOME_FAQS = [
  {
    question: "How much protein should I eat per day?",
    answer:
      "Most active adults aiming to build or keep muscle do well around 1.6–2.2 g per kg of body weight. Use our protein calculator, then map the number onto Indian foods.",
  },
  {
    question: "Do I need a calorie deficit to lose fat?",
    answer:
      "Yes — fat loss requires eating fewer calories than you burn over time. Strength training and enough protein help preserve muscle while you cut.",
  },
  {
    question: "How often should I train each muscle?",
    answer:
      "Hitting each major muscle group about 2× per week works well for most people. Progress load or reps when form stays solid.",
  },
  {
    question: "Are fitlives calculators medical advice?",
    answer:
      "No. Tools and articles are educational only. Talk with a qualified professional for personal medical or diet decisions.",
  },
  {
    question: "Where should I start on this site?",
    answer:
      "Pick a pillar — muscle building, weight loss, or nutrition — open a guide, then use a calculator or the foods/exercises libraries for the next step.",
  },
  {
    question: "What makes Indian foods useful here?",
    answer:
      "Everyday staples like dal, paneer, eggs, and curd are searchable building blocks for protein and meal planning — not just Western grocery lists.",
  },
];

/** Habit FAQ scroller — visible on the home feed. */
export function HomeFaqBand() {
  return (
    <section className="border-b border-border bg-brand-50/50 py-14">
      <div className="fk-page">
        <FaqScrollerBlock
          className="mt-0 w-full overflow-x-clip"
          items={HOME_FAQS}
          title="Common questions"
          subtitle="Quick answers that route into guides, tools, and foods — educational only."
        />
      </div>
    </section>
  );
}
