"use client";

import * as React from "react";
import { Check, Link2, Share2, X } from "lucide-react";
import {
  FaFacebook,
  FaLinkedin,
  FaXTwitter,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics/openpanel";

export type SharePlatform =
  | "x"
  | "facebook"
  | "linkedin"
  | "whatsapp"
  | "mail"
  | "copy";

export interface SocialLink {
  platform: SharePlatform;
  href: string;
}

export interface SocialLinksProps {
  /** Absolute article URL to share / copy */
  url: string;
  /** Article title used in share text */
  title: string;
  /** Which channels to show (default: copy + major networks) */
  platforms?: SharePlatform[];
  showOnMobile?: boolean;
  /**
   * Custom Tailwind color class or raw CSS color for the mobile FAB
   * Example: "bg-[#0A0A0A]" | "#0A0A0A"
   */
  floatingButtonColor?: string;
  className?: string;
}

interface PlatformStyle {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  gradient: string;
  hoverGradient: string;
}

const PLATFORM_STYLES: Record<SharePlatform, PlatformStyle> = {
  x: {
    label: "Share on X",
    icon: FaXTwitter,
    gradient: "from-zinc-900 to-zinc-700",
    hoverGradient: "from-zinc-800 to-zinc-600",
  },
  facebook: {
    label: "Facebook",
    icon: FaFacebook,
    gradient: "from-blue-700 to-blue-500",
    hoverGradient: "from-blue-600 to-blue-400",
  },
  linkedin: {
    label: "LinkedIn",
    icon: FaLinkedin,
    gradient: "from-sky-700 to-sky-500",
    hoverGradient: "from-sky-600 to-sky-400",
  },
  whatsapp: {
    label: "WhatsApp",
    icon: FaWhatsapp,
    gradient: "from-emerald-600 to-emerald-500",
    hoverGradient: "from-emerald-500 to-emerald-400",
  },
  mail: {
    label: "Email",
    icon: FaEnvelope,
    gradient: "from-orange-600 to-amber-500",
    hoverGradient: "from-orange-500 to-amber-400",
  },
  copy: {
    label: "Copy link",
    icon: Link2,
    gradient: "from-zinc-800 to-zinc-600",
    hoverGradient: "from-zinc-700 to-zinc-500",
  },
};

const DEFAULT_PLATFORMS: SharePlatform[] = [
  "copy",
  "x",
  "facebook",
  "linkedin",
  "whatsapp",
  "mail",
];

export function buildShareLinks(
  url: string,
  title: string,
  platforms: SharePlatform[] = DEFAULT_PLATFORMS,
): SocialLink[] {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const body = encodeURIComponent(`${title}\n\n${url}`);

  const hrefFor = (platform: SharePlatform): string => {
    switch (platform) {
      case "x":
        return `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
      case "whatsapp":
        return `https://wa.me/?text=${body}`;
      case "mail":
        return `mailto:?subject=${t}&body=${body}`;
      case "copy":
        return "#copy";
    }
  };

  return platforms.map((platform) => ({
    platform,
    href: hrefFor(platform),
  }));
}

function isRawColor(value: string) {
  return (
    value.startsWith("#") ||
    value.startsWith("rgb") ||
    value.startsWith("hsl")
  );
}

/**
 * Floating blog share rail — desktop slide-out + mobile FAB dock.
 * Shares / copies the current article URL (not profile links).
 */
export function SocialLinks({
  url,
  title,
  platforms = DEFAULT_PLATFORMS,
  showOnMobile = true,
  floatingButtonColor = "bg-[#0A0A0A]",
  className,
}: SocialLinksProps) {
  const links = React.useMemo(
    () => buildShareLinks(url, title, platforms),
    [url, title, platforms],
  );
  const [hoveredPlatform, setHoveredPlatform] =
    React.useState<SharePlatform | null>(null);
  const [mobileDockOpen, setMobileDockOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  function trackShare(channel: string) {
    trackEvent("share_click", { channel, url });
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackShare("copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  async function onActivate(
    e: React.MouseEvent,
    platform: SharePlatform,
  ) {
    if (platform === "copy") {
      e.preventDefault();
      await copyLink();
      return;
    }
    trackShare(platform);
  }

  const fabStyle = isRawColor(floatingButtonColor)
    ? { background: floatingButtonColor }
    : undefined;
  const fabClass = isRawColor(floatingButtonColor)
    ? undefined
    : floatingButtonColor;

  return (
    <div className={cn(className)}>
      {/* Desktop slide-out */}
      <div
        className={`${
          showOnMobile ? "hidden lg:flex" : "hidden md:flex"
        } fixed top-[35%] left-0 z-40 flex-col`}
        aria-label="Share this article"
      >
        <ul className="space-y-3">
          {links.map(({ platform, href }) => {
            const style = PLATFORM_STYLES[platform];
            if (!style) return null;
            const Icon =
              platform === "copy" && copied
                ? Check
                : style.icon;
            const label =
              platform === "copy" && copied ? "Copied!" : style.label;

            return (
              <li
                key={platform}
                onMouseEnter={() => setHoveredPlatform(platform)}
                onMouseLeave={() => setHoveredPlatform(null)}
                className="group"
              >
                <a
                  href={href}
                  target={platform === "copy" ? undefined : "_blank"}
                  rel={platform === "copy" ? undefined : "noreferrer"}
                  onClick={(e) => void onActivate(e, platform)}
                  className="relative ml-[-120px] flex h-14 w-44 items-center justify-between overflow-hidden rounded-r-xl border border-border bg-card px-4 shadow-md transition-all duration-500 ease-out hover:shadow-lg group-hover:ml-[-10px]"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r opacity-90 transition-all duration-500 ${
                      hoveredPlatform === platform
                        ? style.hoverGradient
                        : style.gradient
                    }`}
                  />
                  <span className="relative z-10 text-sm font-semibold tracking-wide text-white transition-all duration-300 group-hover:tracking-widest">
                    {label}
                  </span>
                  <Icon
                    size={22}
                    className="relative z-10 text-white drop-shadow-sm transition-transform duration-500 group-hover:scale-125"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile FAB dock */}
      {showOnMobile ? (
        <div className="fixed right-6 bottom-24 z-50 lg:hidden">
          {mobileDockOpen ? (
            <button
              type="button"
              aria-label="Close share menu"
              className="fixed inset-0 bg-background/60 backdrop-blur-sm"
              onClick={() => setMobileDockOpen(false)}
            />
          ) : null}

          <div className="relative">
            <div
              className={`absolute right-0 bottom-20 flex flex-col-reverse gap-3 transition-all duration-500 ${
                mobileDockOpen
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-8 opacity-0"
              }`}
            >
              {links.map(({ platform, href }, index) => {
                const style = PLATFORM_STYLES[platform];
                if (!style) return null;
                const Icon =
                  platform === "copy" && copied ? Check : style.icon;
                const label =
                  platform === "copy" && copied ? "Copied!" : style.label;

                return (
                  <a
                    key={platform}
                    href={href}
                    target={platform === "copy" ? undefined : "_blank"}
                    rel={platform === "copy" ? undefined : "noreferrer"}
                    onClick={(e) => {
                      void onActivate(e, platform);
                      if (platform === "copy") {
                        /* keep dock open briefly so user sees Copied */
                      } else {
                        setMobileDockOpen(false);
                      }
                    }}
                    className="group relative ml-auto"
                    style={{
                      transitionDelay: mobileDockOpen
                        ? `${index * 50}ms`
                        : "0ms",
                    }}
                    aria-label={label}
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full border border-border bg-gradient-to-br shadow-lg transition-transform duration-300 hover:scale-110 ${style.gradient}`}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    <div className="pointer-events-none absolute top-1/2 right-16 -translate-y-1/2 rounded-md bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                      {label}
                      <div className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-popover" />
                    </div>
                  </a>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setMobileDockOpen((v) => !v)}
              className={cn(
                "relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-border shadow-2xl transition-all duration-300 active:scale-95",
                fabClass,
              )}
              style={fabStyle}
              aria-label={mobileDockOpen ? "Close share menu" : "Share article"}
              aria-expanded={mobileDockOpen}
            >
              <span className="relative z-10">
                {mobileDockOpen ? (
                  <X size={24} className="text-white" />
                ) : (
                  <Share2 size={24} className="text-white" />
                )}
              </span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SocialLinks;
