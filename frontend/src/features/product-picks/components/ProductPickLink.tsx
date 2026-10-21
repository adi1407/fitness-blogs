"use client";

import { ArrowUpRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics/track";

type Props = {
  href: string;
  pickId: string;
  target: string;
  affiliate: boolean;
  label: string;
};

export function ProductPickLink({ href, pickId, target, affiliate, label }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel={affiliate ? "sponsored nofollow noopener noreferrer" : "nofollow noopener noreferrer"}
      onClick={() => trackEvent("product_pick_click", { pick: pickId, target, affiliate })}
      className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#0A0A0A] px-4 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:ring-offset-2 sm:h-9"
    >
      {label}
      <ArrowUpRight className="size-4" aria-hidden />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
