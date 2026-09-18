"use client";

import { useEffect, useState } from "react";
import SphereImageGrid, { type ImageData } from "@/components/ui/img-sphere";

const BASE: Omit<ImageData, "id">[] = [
  {
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
    alt: "Chest training",
    title: "Chest",
    description: "Presses and fly patterns — open the chest exercise hub.",
  },
  {
    src: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?q=80&w=600&auto=format&fit=crop",
    alt: "Back training",
    title: "Back",
    description: "Rows and pulldowns for thickness and width.",
  },
  {
    src: "https://images.unsplash.com/photo-1434682881908-b43dcb7017cd?q=80&w=600&auto=format&fit=crop",
    alt: "Legs training",
    title: "Legs",
    description: "Squats, hinges, and lunges for lower-body strength.",
  },
  {
    src: "https://images.unsplash.com/photo-1583454110551-21d2be4aaa31?q=80&w=600&auto=format&fit=crop",
    alt: "Shoulders training",
    title: "Shoulders",
    description: "Presses and raises for stable deltoid development.",
  },
  {
    src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop",
    alt: "Arms training",
    title: "Arms",
    description: "Elbow flexors and extensors as accessories.",
  },
  {
    src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop",
    alt: "Core training",
    title: "Core",
    description: "Anti-extension and anti-rotation for bracing under load.",
  },
  {
    src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop",
    alt: "Cardio",
    title: "Cardio",
    description: "Conditioning that supports health and fat-loss goals.",
  },
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
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
