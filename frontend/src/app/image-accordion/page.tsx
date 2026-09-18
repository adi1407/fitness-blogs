import type { Metadata } from "next";
import TailwindImageAccordionDemo from "@/components/tailwind-image-accordion-demo";

export const metadata: Metadata = {
  title: "Image Accordion Demo",
  robots: { index: false },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-semibold">Image accordion</h1>
      <TailwindImageAccordionDemo />
    </main>
  );
}
