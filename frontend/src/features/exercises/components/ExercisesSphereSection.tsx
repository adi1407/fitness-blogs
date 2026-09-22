"use client";

import { useEffect, useState } from "react";
import SphereImageGrid, { type ImageData } from "@/components/ui/img-sphere";
import { HUB } from "@/lib/hubImages";

const BASE: Omit<ImageData, "id">[] = [
  {
    src: HUB.bicepCurlWide,
    alt: "Chest training",
    title: "Chest",
    description: "Presses and fly patterns — open the chest exercise hub.",
  },
  {
    src: HUB.dumbbellRow,
    alt: "Back training",
    title: "Back",
    description: "Rows and pulldowns for thickness and width.",
  },
  {
    src: HUB.barbellSquat,
    alt: "Legs training",
    title: "Legs",
    description: "Squats, hinges, and lunges for lower-body strength.",
  },
  {
    src: HUB.deadlift,
    alt: "Shoulders training",
    title: "Shoulders",
    description: "Presses and raises for stable deltoid development.",
  },
  {
    src: HUB.bicepFocus,
    alt: "Arms training",
    title: "Arms",
    description: "Elbow flexors and extensors as accessories.",
  },
  {
    src: HUB.mobilityStretch,
    alt: "Core training",
    title: "Core",
    description: "Anti-extension and anti-rotation for bracing under load.",
  },
  {
    src: HUB.outdoorRun,
    alt: "Cardio",
    title: "Cardio",
    description: "Conditioning that supports health and fat-loss goals.",
  },
  {
    src: HUB.gymFloor,
    alt: "Full gym",
    title: "Full library",
    description: "Browse every muscle-group hub below the sphere.",
  },
];

function buildImages(count: number): ImageData[] {
  const out: ImageData[] = [];
  for (let i = 0; i < count; i++) {
    const base = BASE[i % BASE.length];
    out.push({
      id: `ex-${i + 1}`,
      ...base,
      alt: `${base.alt} ${Math.floor(i / BASE.length) + 1}`,
    });
  }
  return out;
}

/** Interactive 3D sphere preview for the exercise library hub. */
export function ExercisesSphereSection() {
  const [size, setSize] = useState(280);

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 480) setSize(Math.min(280, w - 32));
      else if (w < 768) setSize(Math.min(360, w - 32));
      else setSize(480);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section className="mt-12 overflow-hidden rounded-2xl border border-border bg-brand-50/40 py-10">
      <div className="px-4 text-center sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          Explore the library
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Drag to spin — tap an image for a quick peek at each training theme,
          then open a muscle-group hub below.
        </p>
      </div>
      <div className="mt-6 flex justify-center px-2">
        <SphereImageGrid
          images={buildImages(40)}
          containerSize={size}
          sphereRadius={Math.round(size * 0.42)}
          dragSensitivity={0.75}
          momentumDecay={0.96}
          maxRotationSpeed={5}
          baseImageScale={0.14}
          hoverScale={1.25}
          perspective={1000}
          autoRotate
          autoRotateSpeed={0.18}
        />
      </div>
    </section>
  );
}
