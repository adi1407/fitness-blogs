"use client";

import { usePathname } from "next/navigation";
import PillNav from "@/components/ui/pill-nav";
import { colorSchema } from "@/styles/color-schema";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Nutrition", href: "/nutrition" },
  { label: "Weight Loss", href: "/weight-loss" },
  { label: "Tools", href: "/tools" },
  { label: "Exercises", href: "/exercises" },
  { label: "Foods", href: "/foods" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[1000] h-20">
      <div className="pointer-events-auto mx-auto flex w-full max-w-7xl justify-center px-0 md:justify-start md:px-6 lg:px-8">
        <PillNav
          logo="/logo.svg"
          logoAlt="FitKnowledge"
          items={NAV_ITEMS}
          activeHref={pathname}
          className="custom-nav"
          ease="power2.easeOut"
          baseColor={colorSchema.brand[400]}
          pillColor={colorSchema.background}
          pillTextColor={colorSchema.semantic.foreground}
          hoveredPillTextColor={colorSchema.background}
        />
      </div>
    </header>
  );
}
