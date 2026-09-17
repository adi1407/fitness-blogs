"use client";

import { RadialIntro } from "@/components/animate-ui/components/community/radial-intro";

const ORBIT = [
  {
    id: 1,
    name: "Nutrition",
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Training",
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Tools",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Foods",
    src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Recovery",
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Guides",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop",
  },
];

export function AboutRadialIntro() {
  return (
    <div className="mt-10 flex justify-center py-6">
      <RadialIntro orbitItems={ORBIT} stageSize={300} imageSize={56} />
    </div>
  );
}
