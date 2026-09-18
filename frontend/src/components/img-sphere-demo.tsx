"use client";

import SphereImageGrid, { type ImageData } from "@/components/ui/img-sphere";

const BASE_IMAGES: Omit<ImageData, "id">[] = [
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    alt: "Strength training",
    title: "Strength training",
    description: "Progressive overload and compound lifts for muscle growth.",
  },
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop",
    alt: "Barbell training",
    title: "Barbell work",
    description: "Squats, presses, and hinges that drive hypertrophy.",
  },
  {
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
    alt: "Conditioning",
    title: "Conditioning",
    description: "Cardio and work capacity that support fat-loss goals.",
  },
  {
    src: "https://images.unsplash.com/photo-1583454110551-21d2be4aaa31?q=80&w=600&auto=format&fit=crop",
    alt: "Upper body",
    title: "Upper body",
    description: "Chest, back, and shoulder patterns for balanced development.",
  },
  {
    src: "https://images.unsplash.com/photo-1434682881908-b43dcb7017cd?q=80&w=600&auto=format&fit=crop",
    alt: "Lower body",
    title: "Lower body",
    description: "Legs and posterior chain for strength and athleticism.",
  },
  {
    src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop",
    alt: "Core training",
    title: "Core stability",
    description: "Anti-rotation and bracing that transfer to heavy lifts.",
  },
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop",
    alt: "Mobility",
    title: "Mobility",
    description: "Range of motion work that keeps training sustainable.",
  },
  {
    src: "https://images.unsplash.com/photo-1599058945522-28d272b47b3e?q=80&w=600&auto=format&fit=crop",
    alt: "Dumbbell training",
    title: "Dumbbells",
    description: "Unilateral work and accessories for weak-point training.",
  },
];

const IMAGES: ImageData[] = [];
for (let i = 0; i < 48; i++) {
  const base = BASE_IMAGES[i % BASE_IMAGES.length];
  IMAGES.push({
    id: `sphere-${i + 1}`,
    ...base,
    alt: `${base.alt} (${Math.floor(i / BASE_IMAGES.length) + 1})`,
  });
}

export default function ImgSphereDemo() {
  return (
    <main className="flex min-h-[70vh] w-full items-center justify-center bg-brand-50/40 p-6">
      <SphereImageGrid
        images={IMAGES}
        containerSize={560}
        sphereRadius={200}
        dragSensitivity={0.8}
        momentumDecay={0.96}
        maxRotationSpeed={6}
        baseImageScale={0.15}
        hoverScale={1.3}
        perspective={1000}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </main>
  );
}
