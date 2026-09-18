"use client";

import FaqSection from "@/components/ui/habit-faq-scroller";

const faqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle:
    "Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.",
  rows: [
    {
      id: "row1",
      speed: "60s",
      direction: "left" as const,
      faqItems: [
        {
          id: "q1",
          question: "How much protein do I need?",
          answer:
            "Most active people do well around 1.6–2.2 g per kg of body weight. Use our protein calculator for a personalized estimate.",
        },
        {
          id: "q2",
          question: "Is this medical advice?",
          answer:
            "No. FitKnowledge is educational only. Consult a qualified professional for personal health decisions.",
        },
      ],
    },
    {
      id: "row2",
      speed: "45s",
      direction: "right" as const,
      faqItems: [
        {
          id: "q3",
          question: "Do I need a calorie deficit to lose fat?",
          answer:
            "Yes — sustained fat loss requires burning more energy than you take in. Pair that with protein and strength training to protect muscle.",
        },
        {
          id: "q4",
          question: "Can beginners build muscle?",
          answer:
            "Absolutely. Progressive overload, enough protein, and recovery drive early gains — often without a large surplus.",
        },
      ],
    },
    {
      id: "row3",
      speed: "70s",
      direction: "left" as const,
      faqItems: [
        {
          id: "q5",
          question: "Are the calculators free?",
          answer:
            "Yes. All FitKnowledge calculators are free educational tools that link into guides and food databases.",
        },
        {
          id: "q6",
          question: "Where do Indian foods fit in?",
          answer:
            "Our Indian foods hub maps staples like dal, paneer, and eggs to protein and calorie goals for real diets.",
        },
      ],
    },
  ],
};

export default function HabitFaqScrollerDemo() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-brand-50/40 px-4 py-16">
      <FaqSection data={faqData} />
    </div>
  );
}
