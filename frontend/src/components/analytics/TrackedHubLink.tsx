"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/openpanel";

type Props = {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
  /** Analytics event name; calculator and next-step CTAs use `cta_click`. */
  event?: "hub_click" | "cta_click";
  /** Where the link sits, e.g. `article_calc_card`. */
  placement?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/** Hub / CTA link that records a click event (OpenPanel and GA4). */
export function TrackedHubLink({
  href,
  label,
  className,
  children,
  event = "hub_click",
  placement,
  onClick,
  ...rest
}: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        trackEvent(event, { href, label, placement });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
