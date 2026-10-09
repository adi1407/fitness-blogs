import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BRAND_LOGO_WEB_SRC, BRAND_NAME } from "@/lib/brand";

type BrandLogoProps = {
  href?: string;
  className?: string;
  /**
   * `full` — logo asset as provided (preferred; includes mark + wordmark).
   * `lockup` — logo tile + separate “fitlives” text.
   * `mark` — compact tile only.
   */
  variant?: "full" | "mark" | "lockup";
  size?: "sm" | "md" | "lg";
  /** `dark` for dark backgrounds — the logo asset is a black mark. */
  tone?: "light" | "dark";
};

const FULL_SIZE = {
  sm: "h-8 w-auto max-h-8",
  md: "h-9 w-auto max-h-9 sm:h-10 sm:max-h-10",
  lg: "h-11 w-auto max-h-11",
} as const;

const MARK_SIZE = {
  sm: "size-8",
  md: "size-9 sm:size-10",
  lg: "size-11",
} as const;

const TEXT_SIZE = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

export function BrandLogo({
  href = "/",
  className,
  variant = "full",
  size = "md",
  tone = "light",
}: BrandLogoProps) {
  const dark = tone === "dark";
  const tileClass = cn(
    "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1",
    MARK_SIZE[size],
  );
  const mark = (
    <span className={tileClass}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BRAND_LOGO_WEB_SRC}
        width={160}
        height={153}
        alt=""
        className="h-full w-full object-contain"
      />
    </span>
  );

  let inner: ReactNode;

  if (variant === "full") {
    inner = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={BRAND_LOGO_WEB_SRC}
        width={160}
        height={153}
        alt={BRAND_NAME}
        className={cn(
          "rounded-md object-contain object-left",
          dark && "bg-white p-1",
          FULL_SIZE[size],
        )}
      />
    );
  } else if (variant === "mark") {
    inner = mark;
  } else {
    inner = (
      <>
        {mark}
        <span
          className={cn(
            "font-semibold tracking-tight lowercase",
            dark ? "text-white" : "text-foreground",
            TEXT_SIZE[size],
          )}
        >
          {BRAND_NAME}
        </span>
      </>
    );
  }

  const classes = cn(
    "relative z-10 inline-flex items-center gap-2.5 pr-1",
    className,
  );

  if (!href) {
    return <span className={classes}>{inner}</span>;
  }

  return (
    <Link href={href} aria-label={`${BRAND_NAME} home`} className={classes}>
      {inner}
    </Link>
  );
}
