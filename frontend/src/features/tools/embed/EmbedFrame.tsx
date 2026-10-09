"use client";

import { createContext, useContext, type MouseEvent, type ReactNode } from "react";

const EmbedContext = createContext(false);

/** True inside `/embed/*` widgets: hide account features that can't work in a third-party iframe. */
export function useIsEmbed() {
  return useContext(EmbedContext);
}

/**
 * Wraps an embedded calculator. Any link click opens fitlives in a new tab
 * (with UTM tags) instead of navigating inside the host site's iframe.
 */
export function EmbedFrame({ tool, children }: { tool: string; children: ReactNode }) {
  function onClickCapture(e: MouseEvent<HTMLDivElement>) {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor?.href || anchor.hasAttribute("download")) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin === window.location.origin && url.pathname === window.location.pathname) return;

    e.preventDefault();
    e.stopPropagation();
    if (url.origin === window.location.origin) {
      url.searchParams.set("utm_source", "embed");
      url.searchParams.set("utm_medium", "widget");
      url.searchParams.set("utm_campaign", tool);
    }
    window.open(url.toString(), "_blank", "noopener");
  }

  return (
    <EmbedContext.Provider value>
      <div onClickCapture={onClickCapture}>{children}</div>
    </EmbedContext.Provider>
  );
}
