import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface MasonryCardData {
  id: string;
  src: string;
  alt: string;
  content: string;
  linkHref: string;
  linkText: string;
}

export interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MasonryCardData[];
  /** `large` = 3 columns, bigger cards (Learn page). Default = dense demo grid. */
  size?: "default" | "large";
}

const MasonryGridCSS = () => (
  <style>{`
    @keyframes slide-in {
      from {
        opacity: 0;
        transform: scale(0.85) rotate(calc(var(--side, 1) * (5deg * var(--amp, 1))));
      }
      to {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
    }

    /* Always visible by default — never leave cards stuck at opacity 0 */
    .masonry-card-wrapper {
      opacity: 1;
      transform: none;
    }

    .masonry-card-wrapper {
      &:nth-of-type(2n + 1) { transform-origin: 25vw 100%; }
      &:nth-of-type(2n) { transform-origin: -25vw 100%; }

      @media (min-width: 768px) {
        &:nth-of-type(4n + 1) { transform-origin: 50vw 100%; }
        &:nth-of-type(4n + 2) { transform-origin: 25vw 100%; }
        &:nth-of-type(4n + 3) { transform-origin: -25vw 100%; }
        &:nth-of-type(4n) { transform-origin: -50vw 100%; }
      }

      @media (min-width: 1024px) {
        &:nth-of-type(6n + 1) { transform-origin: 75vw 100%; }
        &:nth-of-type(6n + 2) { transform-origin: 50vw 100%; }
        &:nth-of-type(6n + 3) { transform-origin: 25vw 100%; }
        &:nth-of-type(6n + 4) { transform-origin: -25vw 100%; }
        &:nth-of-type(6n + 5) { transform-origin: -50vw 100%; }
        &:nth-of-type(6n) { transform-origin: -75vw 100%; }
      }
    }

    /* Scroll-driven “fly in from away” only when the browser supports it */
    @supports (animation-timeline: view()) {
      @media (prefers-reduced-motion: no-preference) {
        .masonry-card-wrapper {
          animation: slide-in linear both;
          animation-timeline: view();
          animation-range: entry 0% cover 20%;
        }
      }
    }

    .masonry-grid-large .masonry-card-wrapper {
      &:nth-of-type(2n + 1) { transform-origin: 25vw 100%; }
      &:nth-of-type(2n) { transform-origin: -25vw 100%; }

      @media (min-width: 768px) {
        &:nth-of-type(3n + 1) { transform-origin: 40vw 100%; }
        &:nth-of-type(3n + 2) { transform-origin: 0 100%; }
        &:nth-of-type(3n) { transform-origin: -40vw 100%; }
      }
    }
  `}</style>
);

const MasonryCard = ({
  item,
  className,
  size = "default",
  ...props
}: {
  item: MasonryCardData;
  size?: "default" | "large";
} & React.HTMLAttributes<HTMLDivElement>) => {
  const isInternal = item.linkHref.startsWith("/");
  const large = size === "large";

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <article
        className={cn(
          "rounded-lg border bg-card shadow-md",
          large ? "space-y-3 p-5" : "space-y-2 p-3",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt}
          height={large ? 720 : 500}
          width={large ? 720 : 500}
          className={cn(
            "w-full rounded-md bg-muted object-cover",
            large ? "aspect-[4/3] min-h-[200px]" : "aspect-square",
          )}
          loading="lazy"
        />
        <p
          className={cn(
            "leading-snug text-muted-foreground",
            large
              ? "line-clamp-3 text-base"
              : "line-clamp-2 text-sm leading-tight",
          )}
        >
          {item.content}
        </p>
        {isInternal ? (
          <Link
            href={item.linkHref}
            className={cn(
              "font-semibold text-primary hover:underline",
              large ? "text-base" : "text-sm font-medium",
            )}
          >
            {item.linkText}
          </Link>
        ) : (
          <a
            href={item.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "font-semibold text-primary hover:underline",
              large ? "text-base" : "text-sm font-medium",
            )}
          >
            {item.linkText}
          </a>
        )}
      </article>
    </div>
  );
};

const MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ items, className, size = "default", ...props }, ref) => {
    const large = size === "large";

    return (
      <>
        <MasonryGridCSS />
        <div
          ref={ref}
          className={cn(
            "grid p-4",
            large
              ? "masonry-grid-large grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3"
              : "grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8",
            className,
          )}
          {...props}
        >
          {items.map((item, index) => (
            <MasonryCard
              key={item.id}
              item={item}
              size={size}
              className="masonry-card-wrapper"
              style={
                {
                  "--side": index % 2 === 0 ? 1 : -1,
                  "--amp": Math.ceil((index % 8) / 2),
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </>
    );
  },
);

MasonryGrid.displayName = "MasonryGrid";

export { MasonryGrid, MasonryCard };
