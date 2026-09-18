import type { Metadata } from "next";
import ScrollMorphHeroDemo from "@/components/scroll-morph-hero-demo";

export const metadata: Metadata = {
  title: "Scroll Morph Hero Demo",
  robots: { index: false },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-semibold">Scroll morph hero</h1>
      <ScrollMorphHeroDemo />
    </main>
  );
}
