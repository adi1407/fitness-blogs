"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { SCROLL_MORPH_IMAGES } from "@/lib/hubImages";

const TOTAL_IMAGES = 20;
const SCROLL_RANGE = 1200;

const IMAGES = SCROLL_MORPH_IMAGES;

const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

type Pose = { x: number; y: number; rotation: number; scale: number };

type ClusterLayout = {
  cardW: number;
  cardH: number;
  line: Pose[];
  circle: Pose[];
  arc: {
    radius: number;
    centerY: number;
    startAngle: number;
    step: number;
    scale: number;
    maxRotation: number;
  };
};

function layoutFor(width: number, height: number): ClusterLayout {
  const w = Math.max(width, 1);
  const h = Math.max(height, 1);
  const isPhone = w < 520;
  const isTablet = w >= 520 && w < 900;

  const cardW = isPhone ? 38 : isTablet ? 52 : 60;
  const cardH = isPhone ? 54 : isTablet ? 74 : 85;

  const lineSpacing = Math.min(
    isPhone ? 34 : isTablet ? 50 : 66,
    (w * 0.9) / TOTAL_IMAGES,
  );
  const lineScale = isPhone ? 0.82 : isTablet ? 0.92 : 1;
  const line: Pose[] = Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
    x: i * lineSpacing - ((TOTAL_IMAGES - 1) * lineSpacing) / 2,
    y: 0,
    rotation: 0,
    scale: lineScale,
  }));

  const cardSpan = Math.max(cardW, cardH);
  const maxR = Math.min(w, h) / 2 - cardSpan / 2 - (isPhone ? 10 : 18);
  const circleRadius = Math.max(
    isPhone ? 84 : 108,
    Math.min(maxR, isPhone ? 124 : isTablet ? 188 : 250),
  );
  const circleScale = isPhone ? 0.88 : isTablet ? 0.95 : 1;
  const circle: Pose[] = Array.from({ length: TOTAL_IMAGES }, (_, i) => {
    const angle = (i / TOTAL_IMAGES) * 360;
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * circleRadius,
      y: Math.sin(rad) * circleRadius,
      rotation: angle + 90,
      scale: circleScale,
    };
  });

  const spreadAngle = isPhone ? 72 : isTablet ? 96 : 112;
  const chord = Math.min(w * (isPhone ? 0.7 : 0.8), w - cardW - 16);
  const spreadRad = (spreadAngle * Math.PI) / 180;
  let radius = chord / (2 * Math.sin(spreadRad / 2));
  const apexY = isPhone ? -h * 0.08 : isTablet ? -h * 0.12 : -h * 0.16;
  let centerY = apexY + radius;

  const endAngle = ((-90 + spreadAngle / 2) * Math.PI) / 180;
  const endY = Math.sin(endAngle) * radius + centerY;
  const maxY = h / 2 - cardH * 0.55;
  if (endY > maxY) {
    const overflow = endY - maxY;
    centerY -= overflow;
    radius = Math.max(radius - overflow * 0.15, chord * 0.55);
  }

  return {
    cardW,
    cardH,
    line,
    circle,
    arc: {
      radius,
      centerY,
      startAngle: -90 - spreadAngle / 2,
      step: spreadAngle / (TOTAL_IMAGES - 1),
      scale: isPhone ? 1.05 : isTablet ? 1.18 : 1.32,
      maxRotation: spreadAngle * 0.5,
    },
  };
}

function arcPose(
  index: number,
  spin01: number,
  parallax: number,
  arc: ClusterLayout["arc"],
): Pose {
  const angle =
    arc.startAngle + index * arc.step - clamp01(spin01) * arc.maxRotation;
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * arc.radius + parallax,
    y: Math.sin(rad) * arc.radius + arc.centerY,
    rotation: angle + 90,
    scale: arc.scale,
  };
}

function MorphCard({
  src,
  index,
  layout,
  intro,
  morph,
  spin,
  parallax,
}: {
  src: string;
  index: number;
  layout: ClusterLayout;
  intro: MotionValue<number>;
  morph: MotionValue<number>;
  spin: MotionValue<number>;
  parallax: MotionValue<number>;
}) {
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  const x = useTransform([intro, morph, spin, parallax], (vals) => {
    const [i, m, s, p] = vals as number[];
    const L = layoutRef.current;
    const arc = arcPose(index, s, p, L.arc);
    const mid = lerp(L.circle[index].x, arc.x, clamp01(m));
    return lerp(L.line[index].x, mid, clamp01(i));
  });
  const y = useTransform([intro, morph, spin, parallax], (vals) => {
    const [i, m, s, p] = vals as number[];
    const L = layoutRef.current;
    const arc = arcPose(index, s, p, L.arc);
    const mid = lerp(L.circle[index].y, arc.y, clamp01(m));
    return lerp(L.line[index].y, mid, clamp01(i));
  });
  const rotate = useTransform([intro, morph, spin, parallax], (vals) => {
    const [i, m, s, p] = vals as number[];
    const L = layoutRef.current;
    const arc = arcPose(index, s, p, L.arc);
    const mid = lerp(L.circle[index].rotation, arc.rotation, clamp01(m));
    return lerp(L.line[index].rotation, mid, clamp01(i));
  });
  const scale = useTransform([intro, morph, spin], (vals) => {
    const [i, m, s] = vals as number[];
    const L = layoutRef.current;
    const arc = arcPose(index, s, 0, L.arc);
    const mid = lerp(L.circle[index].scale, arc.scale, clamp01(m));
    return lerp(L.line[index].scale, mid, clamp01(i));
  });

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        left: "50%",
        top: "50%",
        width: layout.cardW,
        height: layout.cardH,
        marginLeft: -layout.cardW / 2,
        marginTop: -layout.cardH / 2,
        x,
        y,
        rotate,
        scale,
      }}
    >
      <div className="h-full w-full overflow-hidden rounded-xl bg-neutral-200 shadow-md ring-1 ring-black/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>
    </motion.div>
  );
}

export default function ScrollMorphHero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 720, height: 480 });
  const [canHover, setCanHover] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const intro = useMotionValue(0);
  const scrollY = useMotionValue(0);
  const mouseX = useMotionValue(0);

  const morphRaw = useTransform(scrollY, [0, SCROLL_RANGE * 0.4], [0, 1]);
  const spinRaw = useTransform(
    scrollY,
    [SCROLL_RANGE * 0.4, SCROLL_RANGE],
    [0, 1],
  );
  const morph = useSpring(morphRaw, { stiffness: 72, damping: 22, mass: 0.8 });
  const spin = useSpring(spinRaw, { stiffness: 64, damping: 22, mass: 0.8 });
  const parallax = useSpring(mouseX, { stiffness: 40, damping: 22 });

  const titleOpacity = useTransform(morph, [0, 0.45], [1, 0]);
  const exploreOpacity = useTransform(morph, [0.55, 1], [0, 1]);
  const exploreY = useTransform(morph, [0.55, 1], [16, 0]);
  const progressWidth = useTransform(scrollY, (v) => {
    const p = clamp01(v / SCROLL_RANGE);
    return `${p * 100}%`;
  });

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setCanHover(hoverMq.matches);
      setReduceMotion(motionMq.matches);
    };
    sync();
    hoverMq.addEventListener("change", sync);
    motionMq.addEventListener("change", sync);
    return () => {
      hoverMq.removeEventListener("change", sync);
      motionMq.removeEventListener("change", sync);
    };
  }, []);

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const apply = () => {
      const width = Math.round(el.clientWidth);
      const height = Math.round(el.clientHeight);
      if (width < 8 || height < 8) return;
      setContainerSize((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height },
      );
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    window.addEventListener("resize", apply);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      intro.set(1);
      return;
    }
    intro.set(0);
    const controls = animate(intro, 1, {
      duration: 1.05,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [intro, reduceMotion]);

  useEffect(() => {
    const el = frameRef.current;
    if (!el || !canHover) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / Math.max(rect.width, 1);
      mouseX.set((nx * 2 - 1) * 36);
    };
    const onLeave = () => mouseX.set(0);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [canHover, mouseX]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || reduceMotion) return;

    let lastY = 0;
    const onStart = (e: TouchEvent) => {
      lastY = e.touches[0]?.clientY ?? 0;
    };
    const onMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? lastY;
      const dy = lastY - y;
      lastY = y;
      if (dy === 0) return;

      const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
      const atStart = el.scrollTop <= 0;
      const atEnd = el.scrollTop >= maxScroll - 1;
      const canConsume = (dy > 0 && !atEnd) || (dy < 0 && !atStart);
      if (!canConsume) return;

      e.preventDefault();
      el.scrollTop = Math.min(Math.max(el.scrollTop + dy, 0), maxScroll);
      scrollY.set(el.scrollTop);
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
    };
  }, [reduceMotion, scrollY, containerSize.height]);

  const layout = useMemo(
    () => layoutFor(containerSize.width, containerSize.height),
    [containerSize.height, containerSize.width],
  );

  return (
    <div
      ref={frameRef}
      className="relative h-full w-full overflow-hidden bg-[#FAFAFA] select-none"
    >
      <div
        ref={scrollerRef}
        className="absolute inset-0 z-20 overflow-y-scroll overscroll-y-auto touch-pan-y scrollbar-none outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:ring-inset"
        style={{ WebkitOverflowScrolling: "touch" }}
        tabIndex={0}
        role="region"
        aria-label="Scroll inside this frame to open the image cluster"
        onScroll={(e) => {
          const el = e.currentTarget;
          scrollY.set(el.scrollTop);
          const atStart = el.scrollTop <= 0;
          const atEnd =
            el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
          el.style.overscrollBehaviorY =
            atStart || atEnd ? "auto" : "contain";
        }}
        onKeyDown={(e) => {
          const el = e.currentTarget;
          if (e.key === "ArrowDown" || e.key === "PageDown") {
            e.preventDefault();
            el.scrollBy({ top: e.key === "PageDown" ? 200 : 72 });
          } else if (e.key === "ArrowUp" || e.key === "PageUp") {
            e.preventDefault();
            el.scrollBy({ top: e.key === "PageUp" ? -200 : -72 });
          }
        }}
      >
        <div
          style={{
            height: reduceMotion
              ? "100%"
              : containerSize.height > 0
                ? containerSize.height + SCROLL_RANGE
                : `calc(100% + ${SCROLL_RANGE}px)`,
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10">
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute top-[42%] left-1/2 z-0 w-[min(52%,11.5rem)] -translate-x-1/2 -translate-y-1/2 px-2 text-center sm:w-[min(62%,20rem)] md:w-[min(90%,36rem)]"
        >
          <h2 className="text-[1.05rem] leading-snug font-medium tracking-tight text-foreground sm:text-2xl md:text-4xl">
            Fitness knowledge, built to explore.
          </h2>
          <p className="mt-3 text-[10px] font-bold tracking-[0.18em] text-muted-foreground uppercase sm:text-xs sm:tracking-[0.2em]">
            Scroll to explore
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: exploreOpacity, y: exploreY }}
          className="absolute top-[9%] left-1/2 z-10 w-[min(92%,36rem)] -translate-x-1/2 px-3 text-center sm:top-[10%]"
        >
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-5xl">
            Explore fitlives
          </h2>
          <p className="mx-auto max-w-lg text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
            Nutrition, training, tools, and Indian foods — scroll through the
            clusters that power our learning hub.
          </p>
        </motion.div>

        {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => (
              <MorphCard
                key={src}
                src={src}
                index={i}
                layout={layout}
                intro={intro}
                morph={morph}
                spin={spin}
                parallax={parallax}
              />
            ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-10 bg-linear-to-t from-[#FAFAFA] to-transparent sm:h-12" />
      <div className="pointer-events-none absolute inset-x-4 bottom-3 z-30 h-0.5 overflow-hidden rounded-full bg-black/10 sm:inset-x-6">
        <motion.div
          className="h-full bg-[#0A0A0A]"
          style={{ width: progressWidth }}
        />
      </div>
    </div>
  );
}
