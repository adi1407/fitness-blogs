"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** How far the items are from the center. */
  radius?: number;
  /** Auto-rotation speed when not scrolling. */
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    { items, className, radius: radiusProp, autoRotateSpeed = 0.08, ...props },
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const rotationRef = useRef(0);
    const scrollingRef = useRef(false);
    const lastScrollY = useRef(0);
    const rafRef = useRef<number | null>(null);
    const scrollStopRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [radius, setRadius] = useState(radiusProp ?? 140);

    useLayoutEffect(() => {
      const el = rootRef.current;
      if (!el) return;

      const measure = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        if (w < 8 || h < 8) return;
        const compact = w < 640;
        const next = Math.round(
          Math.max(
            compact ? 100 : 150,
            Math.min(
              radiusProp ?? 400,
              (Math.min(w, h) - (compact ? 90 : 140)) / 2,
            ),
          ),
        );
        setRadius((prev) => (prev === next ? prev : next));
      };

      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(el);
      return () => observer.disconnect();
    }, [radiusProp]);

    useEffect(() => {
      const apply = () => {
        if (stageRef.current) {
          stageRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
        }
      };

      const tick = () => {
        if (!scrollingRef.current) {
          rotationRef.current += autoRotateSpeed;
        }
        apply();
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);

      const onScroll = () => {
        const y = window.scrollY;
        const dy = y - lastScrollY.current;
        lastScrollY.current = y;
        scrollingRef.current = true;
        rotationRef.current += dy * 0.12;
        if (scrollStopRef.current) clearTimeout(scrollStopRef.current);
        scrollStopRef.current = setTimeout(() => {
          scrollingRef.current = false;
        }, 140);
      };

      lastScrollY.current = window.scrollY;
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (scrollStopRef.current) clearTimeout(scrollStopRef.current);
        window.removeEventListener("scroll", onScroll);
      };
    }, [autoRotateSpeed]);

    const anglePerItem = 360 / Math.max(items.length, 1);

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="region"
        aria-label="Circular food gallery"
        className={cn(
          "relative flex h-full w-full items-center justify-center",
          className,
        )}
        style={{ perspective: "1100px" }}
        {...props}
      >
        <div
          ref={stageRef}
          className="relative h-full w-full will-change-transform"
          style={{ transformStyle: "preserve-3d", transform: "rotateY(0deg)" }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            return (
              <div
                key={`${item.common}-${item.photo.url}`}
                role="group"
                aria-label={item.common}
                className="absolute h-[150px] w-[108px] sm:h-[220px] sm:w-[156px] md:h-[280px] md:w-[196px]"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) translate(-50%, -50%)`,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: item.photo.pos || "center" }}
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-2.5 text-white sm:p-3">
                    <h2 className="line-clamp-1 text-sm font-bold sm:text-base">
                      {item.common}
                    </h2>
                    <p className="line-clamp-1 text-[10px] italic opacity-80 sm:text-xs">
                      {item.binomial}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
