"use client";

import { useEffect } from "react";

/** Reports the missing path (and where the visitor came from) so editors can add a redirect. */
export function NotFoundBeacon() {
  useEffect(() => {
    const body = JSON.stringify({ path: window.location.pathname, referrer: document.referrer });
    const blob = new Blob([body], { type: "application/json" });
    if (!navigator.sendBeacon?.("/api/not-found-log", blob)) {
      void fetch("/api/not-found-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => undefined);
    }
  }, []);
  return null;
}
