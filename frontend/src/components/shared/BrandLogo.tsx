import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BRAND_LOGO_SRC, BRAND_NAME } from "@/lib/brand";

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
  md: "text-sm sm:text-base",
  lg: "text-lg",
} as const;

export function BrandLogo({
  href = "/",
  className,
  variant = "full",
  size = "md",
}: BrandLogoProps) {
  let inner: ReactNode;

  if (variant === "full") {
    inner = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={BRAND_LOGO_SRC}
        alt={BRAND_NAME}
        className={cn(
          "rounded-md object-contain object-left",
          FULL_SIZE[size],
        )}
      />
    );
  } else if (variant === "mark") {
    inner = (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0A0A0A]",
          MARK_SIZE[size],
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BRAND_LOGO_SRC}
          alt=""
          className="h-full w-full object-contain"
        />
      </span>
    );
  } else {
    inner = (
      <>
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0A0A0A]",
            MARK_SIZE[size],
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BRAND_LOGO_SRC}
            alt=""
            className="h-full w-full object-contain"
          />
        </span>
        <span
          className={cn(
            "font-semibold tracking-tight text-foreground lowercase",
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
