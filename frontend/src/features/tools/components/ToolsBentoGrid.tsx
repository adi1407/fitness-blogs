"use client";

import Link from "next/link";
import { BentoCard } from "@/components/ui/bento";
import { HUB } from "@/lib/hubImages";

const TOOLS = [
  {
    href: "/tools/tdee-calculator",
    eyebrow: "Energy",
    title: "TDEE Calculator",
    description:
      "Estimate maintenance calories, then set a deficit or surplus with educational next steps.",
    image: HUB.powerBowl,
    className: "max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl",
  },
  {
    href: "/tools/protein-calculator",
    eyebrow: "Nutrition",
    title: "Protein Calculator",
    description:
      "Daily protein targets by body weight and goal — then jump into Indian foods.",
    image: HUB.chickenBowl,
    className: "lg:col-span-3 lg:rounded-tr-4xl",
  },
  {
    href: "/tools/macro-calculator",
    eyebrow: "Macros",
    title: "Macro Calculator",
    description: "Turn calorie targets into protein, carbs, and fat splits.",
    image: HUB.veggieBowl,
    className: "lg:col-span-2 lg:rounded-bl-4xl",
  },
  {
    href: "/tools/calorie-calculator",
    eyebrow: "Goals",
    title: "Calorie Calculator",
    description: "Practical daily calorie ranges for fat loss or muscle gain.",
    image: HUB.saladBowl,
    className: "lg:col-span-2",
  },
  {
    href: "/tools/bmi-calculator",
    eyebrow: "Screening",
    title: "BMI & BMR",
    description:
      "Quick screening metrics with clear limits — not a full health assessment.",
    image: HUB.checkup,
    className: "max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl",
  },
] as const;

export function ToolsBentoGrid() {
  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${tool.className}`}
          >
            <BentoCard
              eyebrow={tool.eyebrow}
              title={tool.title}
              description={tool.description}
              className="h-full ring-brand-100/40 bg-[#0b2533]"
              graphic={
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${tool.image})` }}
                />
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
