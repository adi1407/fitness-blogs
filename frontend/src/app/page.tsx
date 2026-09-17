import type { Metadata } from "next";
import { HomePageContent } from "@/features/home/components/HomePageContent";

export const metadata: Metadata = {
  title: {
    absolute: "FitKnowledge — Fitness, Nutrition & Training Guides",
  },
  description:
    "Build a stronger body with evidence-informed nutrition, weight loss, muscle building, Indian foods, exercise libraries, and free fitness calculators.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "FitKnowledge — Fitness Knowledge Platform",
    description:
      "Guides, calculators, foods, and exercises designed for real search intent.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <HomePageContent />
    </main>
  );
}
