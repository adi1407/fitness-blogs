"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/openpanel";

type Props = {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/** Hub / CTA link that fires `hub_click` when OpenPanel is enabled. */
export function TrackedHubLink({
  href,
  label,
  className,
  children,
  onClick,
  ...rest
}: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        trackEvent("hub_click", { href, label });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
