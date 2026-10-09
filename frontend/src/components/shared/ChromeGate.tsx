"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/** Hides site chrome (header, footer, cookie banner) on routes rendered inside third-party iframes. */
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname?.startsWith("/embed/") ? null : children;
}
