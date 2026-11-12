"use client";

import { createContext, useContext, type ReactNode } from "react";

const LiveArticleSlugsContext = createContext<Set<string> | null>(null);

/** Server-built allowlist of published article slugs for calculator CTAs. */
export function LiveArticleSlugsProvider({
  slugs,
  children,
}: {
  slugs: string[];
  children: ReactNode;
}) {
  return (
    <LiveArticleSlugsContext.Provider value={new Set(slugs)}>
      {children}
    </LiveArticleSlugsContext.Provider>
  );
}

export function useLiveArticleSlugs(): Set<string> | null {
  return useContext(LiveArticleSlugsContext);
}
