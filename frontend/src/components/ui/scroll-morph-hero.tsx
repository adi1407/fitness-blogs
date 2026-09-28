"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { BRAND_SLOGAN } from "@/lib/brand";
import { SCROLL_MORPH_IMAGES } from "@/lib/hubImages";
import { cn } from "@/lib/utils";

const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));
const DEG = Math.PI / 180;

type Pose = { x: number; y: number; rotation: number; scale: number };

type ClusterLayout = {
  count: number;
  cardW: number;
  cardH: number;
  titleMaxW: number;
  line: Pose[];
  circle: Pose[];
  arc: Pose[];
};

/**
 * All three poses are computed to stay inside the frame: the circle leaves room
 * for the centre title, and the fan's ends and apex never cross the frame edge
 * or the heading above it.
 */
function layoutFor(width: number, height: number): ClusterLayout {
  const w = Math.max(width, 1);
  const h = Math.max(height, 1);
  const isPhone = w < 520;
  const isTablet = !isPhone && w < 900;

  const count = isPhone ? 12 : isTablet ? 16 : 20;
  const cardW = isPhone ? 40 : isTablet ? 54 : 64;
  const cardH = Math.round(cardW * 1.4);
  const span = Math.max(cardW, cardH);

  const lineSpacing = Math.min(cardW + 8, (w * 0.92 - cardW) / (count - 1));
  const line = Array.from({ length: count }, (_, i) => ({
    x: i * lineSpacing - ((count - 1) * lineSpacing) / 2,
    y: 0,
    rotation: 0,
    scale: 1,
  }));

  const circleR = clamp(
    Math.min(w, h) / 2 - span * 0.6 - 12,
    isPhone ? 96 : 120,
    isPhone ? 150 : isTablet ? 210 : 250,
  );
  const circleScale = Math.min(1, (2 * Math.PI * circleR) / count / (cardW * 1.05));
  // Card 0 starts at the bottom and the ring runs clockwise over the top, the
  // same left-to-right order as the fan, so cards unfold without crossing.
  const circle = Array.from({ length: count }, (_, i) => {
    const angle = -270 + ((i + 0.5) / count) * 360;
    return {
      x: Math.cos(angle * DEG) * circleR,
      y: Math.sin(angle * DEG) * circleR,
      rotation: angle + 90,
      scale: circleScale,
    };
  });
  const titleMaxW = Math.max(140, 2 * (circleR - span * 0.55) * 0.9);

  const theta = isPhone ? 180 : isTablet ? 150 : 130;
  const half = (theta / 2) * DEG;
  const topY = -h * 0.04;
  const bottomY = h / 2 - cardH * 0.75 - 16;
  const rByWidth = (w / 2 - cardW * 0.9 - 8) / Math.sin(half);
  const rByHeight = (bottomY - topY) / (1 - Math.cos(half));
  const r = Math.max(60, Math.min(rByWidth, rByHeight));
  const arcHeight = r * (1 - Math.cos(half));
  const apexY = topY + Math.max(0, (bottomY - topY - arcHeight) / 2);
  const centerY = apexY + r;
  const spacing = (r * theta * DEG) / (count - 1);
  const arcScale = clamp(spacing / (cardW * 1.12), 0.55, isPhone ? 1 : 1.15);
  const arc = Array.from({ length: count }, (_, i) => {
    const angle = -90 - theta / 2 + (i * theta) / (count - 1);
    return {
      x: Math.cos(angle * DEG) * r,
      y: Math.sin(angle * DEG) * r + centerY,
      rotation: angle + 90,
      scale: arcScale,
    };
  });

  return { count, cardW, cardH, titleMaxW, line, circle, arc };
}

function poseAt(L: ClusterLayout, i: number, intro: number, morph: number): Pose {
  const a = clamp01(intro);
  const b = clamp01(morph);
  const line = L.line[i];
  const circle = L.circle[i];
  const arc = L.arc[i];
  return {
    x: lerp(line.x, lerp(circle.x, arc.x, b), a),
    y: lerp(line.y, lerp(circle.y, arc.y, b), a),
    rotation: lerp(line.rotation, lerp(circle.rotation, arc.rotation, b), a),
    scale: lerp(line.scale, lerp(circle.scale, arc.scale, b), a),
  };
}

function MorphCard({
  src,
  index,
  layout,
  layoutRef,
  layoutVersion,
  intro,
  morph,
  parallax,
}: {
  src: string;
  index: number;
  layout: ClusterLayout;
  layoutRef: RefObject<ClusterLayout>;
  layoutVersion: MotionValue<number>;
  intro: MotionValue<number>;
  morph: MotionValue<number>;
  parallax: MotionValue<number>;
}) {
  // layoutVersion is an input only so the transforms recompute on resize.
  const inputs = useMemo(
    () => [layoutVersion, intro, morph, parallax],
    [layoutVersion, intro, morph, parallax],
  );
  // The shared ref updates after commit, so a card added by a resize may be
  // rendered before it holds a pose for this index.
  const pose = (v: number[]) => {
    const L = index < layoutRef.current.count ? layoutRef.current : layout;
    return poseAt(L, index, v[1], v[2]);
  };
  const x = useTransform(inputs, (v: number[]) => pose(v).x + v[3] * clamp01(v[2]));
  const y = useTransform(inputs, (v: number[]) => pose(v).y);
  const rotate = useTransform(inputs, (v: number[]) => pose(v).rotation);
  const scale = useTransform(inputs, (v: number[]) => pose(v).scale);

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
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    </motion.div>
  );
}

/**
 * Scroll-linked image cluster: a pinned frame whose cards go line → circle →
 * open fan as the page scrolls past. Uses normal page scroll (no nested
 * scroller), so wheel, trackpad, touch and keyboard all behave the same.
 */
export default function ScrollMorphHero({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion() ?? false;
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 720, height: 520 });
  const [canHover, setCanHover] = useState(false);

  const layout = useMemo(() => layoutFor(size.width, size.height), [size]);
  const layoutRef = useRef(layout);
  const layoutVersion = useMotionValue(0);

  const intro = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const parallax = useSpring(mouseX, { stiffness: 40, damping: 22 });

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const morphRaw = useTransform(scrollYProgress, [0.1, 0.65], [0, 1]);
  const morphSpring = useSpring(morphRaw, { stiffness: 140, damping: 28, mass: 0.6 });
  const settled = useMotionValue(1);
  const morph = reduceMotion ? settled : morphSpring;

  const titleOpacity = useTransform([intro, morph], (v) => {
    const [i, m] = v as number[];
    return clamp01((i - 0.6) / 0.4) * (1 - clamp01(m / 0.35));
  });
  const exploreOpacity = useTransform(morph, [0.6, 1], [0, 1]);
  const exploreY = useTransform(morph, [0.6, 1], [16, 0]);
  const progressScale = useTransform(scrollYProgress, (v) => clamp01(v));

  const inView = useInView(frameRef, { once: true, amount: 0.35 });

  useLayoutEffect(() => {
    layoutRef.current = layout;
    layoutVersion.set(layoutVersion.get() + 1);
  }, [layout, layoutVersion]);

  useEffect(() => {
    if (reduceMotion) {
      intro.set(1);
      return;
    }
    if (!inView) return;
    const controls = animate(intro, 1, {
      duration: 1.05,
      delay: 0.15,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, intro, reduceMotion]);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = frameRef.current;
    if (!el || !canHover || reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / Math.max(rect.width, 1);
      mouseX.set((nx * 2 - 1) * 24);
    };
    const onLeave = () => mouseX.set(0);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [canHover, mouseX, reduceMotion]);

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const apply = () => {
      const width = Math.round(el.clientWidth);
      const height = Math.round(el.clientHeight);
      if (width < 8 || height < 8) return;
      setSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height },
      );
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={trackRef}
      className={cn("relative", className)}
      style={{ height: reduceMotion ? undefined : "calc(100dvh + 100vh)" }}
    >
      <div className="sticky top-[calc(var(--site-header-height,64px)+1rem)]">
        <div
          ref={frameRef}
          className="relative h-[min(640px,calc(100dvh-var(--site-header-height,64px)-2rem))] min-h-[380px] w-full overflow-hidden rounded-2xl border border-border bg-[#FAFAFA] select-none"
          role="img"
          aria-label="Fitness and nutrition photos arranged in a circle that opens into a fan as you scroll"
        >
          <motion.div
            style={{ opacity: titleOpacity, maxWidth: layout.titleMaxW }}
            className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 px-2 text-center"
          >
            <p className="text-[1.05rem] leading-snug font-medium tracking-tight text-foreground sm:text-2xl lg:text-3xl">
              {BRAND_SLOGAN}
            </p>
            <p className="mt-3 text-[10px] font-bold tracking-[0.18em] text-muted-foreground uppercase sm:text-xs">
              Keep scrolling
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: exploreOpacity, y: exploreY }}
            className="pointer-events-none absolute top-[7%] left-1/2 z-10 w-[min(92%,36rem)] -translate-x-1/2 px-3 text-center"
          >
            <p className="mb-2 text-2xl font-semibold tracking-tight text-foreground sm:mb-3 sm:text-3xl md:text-4xl">
              Explore fitlives
            </p>
            <p className="mx-auto max-w-lg text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
              Nutrition, training, tools, and Indian foods — the clusters that
              power our learning hub.
            </p>
          </motion.div>

          <div className="pointer-events-none absolute inset-0">
            {SCROLL_MORPH_IMAGES.slice(0, layout.count).map((src, i) => (
              <MorphCard
                key={src}
                src={src}
                index={i}
                layout={layout}
                layoutRef={layoutRef}
                layoutVersion={layoutVersion}
                intro={intro}
                morph={morph}
                parallax={parallax}
              />
            ))}
          </div>

          {!reduceMotion ? (
            <div className="pointer-events-none absolute inset-x-4 bottom-3 z-30 h-0.5 overflow-hidden rounded-full bg-black/10 sm:inset-x-6">
              <motion.div
                className="h-full origin-left bg-[#0A0A0A]"
                style={{ scaleX: progressScale }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
