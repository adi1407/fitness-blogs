"use client";

import { usePathname } from "next/navigation";
import PillNav from "@/components/ui/pill-nav";
import { colorSchema } from "@/styles/color-schema";

const ITEMS = [
  { label: "Latest", href: "/blog", ariaLabel: "Latest articles" },
  { label: "Nutrition", href: "/blog/nutrition" },
  { label: "Weight Loss", href: "/blog/weight-loss" },
  { label: "Muscle", href: "/blog/muscle-building" },
  { label: "Tools", href: "/tools" },
];

export function BlogPillNav() {
  const pathname = usePathname();

  return (
    <div className="mb-2 overflow-x-auto pb-1">
      <PillNav
        logo="/logo.svg"
        logoAlt="FitKnowledge"
        items={ITEMS}
        activeHref={pathname}
        baseColor={colorSchema.brand[400]}
        pillColor="#FFFFFF"
        pillTextColor={colorSchema.semantic.foreground}
        hoveredPillTextColor="#FFFFFF"
        className="!static"
      />
    </div>
  );
}
