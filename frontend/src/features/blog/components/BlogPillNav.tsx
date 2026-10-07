"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/** `href` is the canonical hub; `match` also lights up the tab on `/blog/{category}/…`. */
const ITEMS: ReadonlyArray<{ label: string; href: string; match?: string }> = [
  { label: "Latest", href: "/blog" },
  { label: "Nutrition", href: "/nutrition", match: "/blog/nutrition" },
  { label: "Weight Loss", href: "/weight-loss", match: "/blog/weight-loss" },
  {
    label: "Muscle Building",
    href: "/muscle-building",
    match: "/blog/muscle-building",
  },
  { label: "Tools", href: "/tools" },
];

function isUnder(pathname: string, base: string): boolean {
  return pathname === base || pathname.startsWith(`${base}/`);
}

/** Topic strip — MNT-like underline active state (not heavy pills). */
export function BlogPillNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Blog sections"
      className="flex gap-1 overflow-x-auto border-b border-border scrollbar-none"
    >
      {ITEMS.map((item) => {
        const active =
          item.href === "/blog"
            ? pathname === "/blog"
            : isUnder(pathname, item.href) ||
              (item.match != null && isUnder(pathname, item.match));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "shrink-0 border-b-2 px-3.5 py-3 text-sm font-semibold transition",
              active
                ? "border-accent text-foreground"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
