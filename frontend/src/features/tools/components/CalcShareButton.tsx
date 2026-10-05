"use client";

import { useRef, useState } from "react";
import { Check, Loader2, Share2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics/openpanel";
import { ogImageUrl } from "@/lib/og/url";
import { CALC_TOOLS, type CalcSavePayload } from "@/features/tools/types";

type Status = "idle" | "working" | "shared" | "copied" | "downloaded" | "error";

function formatStat(value: string | number): string {
  return typeof value === "number" ? value.toLocaleString("en-IN") : value;
}

/** "Daily protein" → "daily protein", but keep acronyms like "BMI" / "TDEE". */
function lowerFirst(label: string): string {
  return /^[A-Z][a-z]/.test(label) ? label.charAt(0).toLowerCase() + label.slice(1) : label;
}

function shareContent(payload: CalcSavePayload) {
  const { label, value, unit } = payload.result;
  const toolName = CALC_TOOLS[payload.tool];
  const stat = formatStat(value);
  const what = lowerFirst(label);
  return {
    imageUrl: ogImageUrl({
      title: `My ${what}`,
      eyebrow: toolName,
      stat,
      statLabel: unit || undefined,
    }),
    text: `My ${what}: ${stat}${unit ? ` ${unit}` : ""} — worked out with the free fitlives ${toolName.replace(/^[A-Z][a-z]/, (m) => m.toLowerCase())}.`,
    fileName: `fitlives-${payload.tool}.png`,
  };
}

function pageUrl() {
  const url = new URL(window.location.pathname, window.location.origin);
  url.searchParams.set("utm_source", "share");
  url.searchParams.set("utm_medium", "calculator");
  return url.toString();
}

/**
 * Shares a branded result card: native share sheet with the image where
 * supported, otherwise downloads the image and copies the link.
 */
export function CalcShareButton({ payload }: { payload: CalcSavePayload }) {
  const [status, setStatus] = useState<Status>("idle");
  const imageRef = useRef<Promise<Blob | null> | null>(null);
  const { imageUrl, text, fileName } = shareContent(payload);

  function prefetchImage() {
    imageRef.current ??= fetch(imageUrl)
      .then((r) => (r.ok ? r.blob() : null))
      .catch(() => null);
    return imageRef.current;
  }

  async function onShare() {
    setStatus("working");
    const url = pageUrl();
    const blob = await prefetchImage();
    const file = blob ? new File([blob], fileName, { type: "image/png" }) : null;

    try {
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: `${text} ${url}` });
        trackEvent("calc_share_result", { tool: payload.tool, method: "native_image" });
        setStatus("shared");
        return;
      }
      if (typeof navigator.share === "function") {
        await navigator.share({ text, url });
        trackEvent("calc_share_result", { tool: payload.tool, method: "native_link" });
        setStatus("shared");
        return;
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setStatus("idle");
        return;
      }
    }

    let copied = false;
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      copied = true;
    } catch {
      /* clipboard can be blocked; the download still works */
    }
    if (blob) {
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = fileName;
      a.click();
      setTimeout(() => URL.revokeObjectURL(href), 1000);
    }
    if (!blob && !copied) {
      setStatus("error");
      return;
    }
    trackEvent("calc_share_result", { tool: payload.tool, method: blob ? "download" : "copy" });
    setStatus(blob ? "downloaded" : "copied");
  }

  const message =
    status === "shared"
      ? "Thanks for sharing!"
      : status === "downloaded"
        ? "Image saved — link copied to clipboard."
        : status === "copied"
          ? "Link copied to clipboard."
          : status === "error"
            ? "Couldn't share right now. Please try again."
            : null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onShare}
        onPointerEnter={prefetchImage}
        onFocus={prefetchImage}
        disabled={status === "working"}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-white px-5 text-sm font-semibold text-foreground transition hover:border-[#FF9800] focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none disabled:opacity-60"
      >
        {status === "working" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : status === "shared" || status === "downloaded" || status === "copied" ? (
          <Check className="size-4 text-[#FF9800]" aria-hidden="true" />
        ) : (
          <Share2 className="size-4" aria-hidden="true" />
        )}
        Share my result
      </button>
      {message ? (
        <p role="status" className={status === "error" ? "text-xs text-red-700" : "text-xs text-muted-foreground"}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
