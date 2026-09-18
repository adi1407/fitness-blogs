"use client";

import React, {
  useState,
  useEffect,
  useRef,
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
    { items, className, radius = 600, autoRotateSpeed = 0.02, ...props },
    ref,
  ) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress =
          scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        setRotation(scrollProgress * 360);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) {
          setRotation((prev) => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, autoRotateSpeed]);

    const anglePerItem = 360 / Math.max(items.length, 1);
    const compact = radius < 300;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative flex h-full w-full items-center justify-center",
          className,
        )}
        style={{ perspective: "2000px" }}
        {...props}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle,
            );
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);

            return (
              <div
                key={`${item.common}-${item.photo.url}`}
                role="group"
                aria-label={item.common}
                className={cn(
                  "absolute",
                  compact
                    ? "h-[220px] w-[160px]"
                    : "h-[260px] w-[190px] sm:h-[360px] sm:w-[270px] lg:h-[400px] lg:w-[300px]",
                )}
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) translate(-50%, -50%)`,
                  left: "50%",
                  top: "50%",
                  opacity,
                  transition: "opacity 0.3s linear",
                }}
              >
                <div className="group relative h-full w-full overflow-hidden rounded-lg border border-border bg-card/70 shadow-2xl backdrop-blur-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: item.photo.pos || "center" }}
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 text-white sm:p-4">
                    <h2 className="line-clamp-2 text-base font-bold sm:text-xl">
                      {item.common}
                    </h2>
                    <em className="line-clamp-1 text-xs italic opacity-80 sm:text-sm">
                      {item.binomial}
                    </em>
                    <p className="mt-1 line-clamp-1 text-[10px] opacity-70 sm:mt-2 sm:text-xs">
                      Photo by: {item.photo.by}
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
