"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Latest", href: "/blog" },
  { label: "Nutrition", href: "/blog/nutrition" },
  { label: "Weight Loss", href: "/blog/weight-loss" },
  { label: "Muscle Building", href: "/blog/muscle-building" },
  { label: "Tools", href: "/tools" },
] as const;

/** Inline category chips — not a second site header. */
export function BlogPillNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Blog sections"
      className="flex flex-wrap gap-2 border-b border-border pb-4"
    >
      {ITEMS.map((item) => {
        const active =
          item.href === "/blog"
            ? pathname === "/blog"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-semibold transition",
              active
                ? "bg-primary text-white"
                : "bg-brand-50 text-foreground hover:bg-brand-100",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
