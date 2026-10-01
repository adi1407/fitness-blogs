"use client";

import type { IconType } from "react-icons";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

import { trackEvent } from "@/lib/analytics/openpanel";
import { BRAND_NAME } from "@/lib/brand";
import { SOCIAL_PROFILES, type SocialNetwork } from "@/lib/social";
import { cn } from "@/lib/utils";

const ICONS: Record<SocialNetwork, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
};

export type SocialFollowPlacement =
  | "article_end"
  | "footer"
  | "mobile_menu"
  | "calculator"
  | "contact"
  | "about";

type SocialFollowProps = {
  /** `icons` = compact icon row, `card` = headline + CTA buttons, `strip` = one-line prompt + buttons. */
  variant?: "icons" | "card" | "strip";
  placement: SocialFollowPlacement;
  className?: string;
  title?: string;
  description?: string;
};

function track(network: SocialNetwork, placement: SocialFollowPlacement) {
  trackEvent("social_follow_click", { network, placement });
}

function linkLabel(label: string) {
  return `${BRAND_NAME} on ${label} (opens in a new tab)`;
}

function FollowButtons({
  placement,
  size = "md",
}: {
  placement: SocialFollowPlacement;
  size?: "sm" | "md";
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {SOCIAL_PROFILES.map((p) => {
        const Icon = ICONS[p.id];
        return (
          <a
            key={p.id}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={linkLabel(p.label)}
            onClick={() => track(p.id, placement)}
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-lg font-semibold transition-colors",
              size === "sm" ? "px-3 py-2 text-xs" : "px-4 py-2 text-sm",
              p.id === "instagram"
                ? "bg-primary text-primary-foreground hover:bg-foreground/90"
                : "border border-border bg-white text-foreground hover:border-accent",
            )}
          >
            <Icon aria-hidden className="size-4 shrink-0" />
            {p.cta}
          </a>
        );
      })}
    </div>
  );
}

export function SocialFollow({
  variant = "icons",
  placement,
  className,
  title = `Follow ${BRAND_NAME}`,
  description = "Short, evidence-based fitness and nutrition tips for India, every week. Reels on Instagram, guides on Facebook.",
}: SocialFollowProps) {
  if (variant === "icons") {
    return (
      <ul className={cn("flex items-center gap-2", className)} aria-label={`${BRAND_NAME} on social media`}>
        {SOCIAL_PROFILES.map((p) => {
          const Icon = ICONS[p.id];
          return (
            <li key={p.id}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={linkLabel(p.label)}
                title={`${p.label} · ${p.handle}`}
                onClick={() => track(p.id, placement)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Icon aria-hidden className="size-[18px]" />
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  if (variant === "strip") {
    return (
      <div
        className={cn(
          "flex flex-col gap-3 rounded-xl border border-border bg-muted/60 p-4 sm:flex-row sm:items-center sm:justify-between",
          className,
        )}
      >
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
        <FollowButtons placement={placement} size="sm" />
      </div>
    );
  }

  return (
    <aside className={cn("fk-callout", className)} aria-label={title}>
      <p className="fk-meta-accent">Community</p>
      <p className="mt-1 text-lg font-bold text-foreground">{title}</p>
      <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4">
        <FollowButtons placement={placement} />
      </div>
    </aside>
  );
}
