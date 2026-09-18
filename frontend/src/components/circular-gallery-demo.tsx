"use client";

import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";

/** Fitness / Indian-food themed gallery (Unsplash). */
export const FITNESS_GALLERY_ITEMS: GalleryItem[] = [
  {
    common: "Paneer",
    binomial: "High-protein dairy",
    photo: {
      url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop",
      text: "Paneer cubes for high-protein Indian meals",
      pos: "50% 40%",
      by: "Unsplash",
    },
  },
  {
    common: "Dal",
    binomial: "Lentil protein + fiber",
    photo: {
      url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop",
      text: "Bowl of dal lentils",
      pos: "50% 50%",
      by: "Unsplash",
    },
  },
  {
    common: "Eggs",
    binomial: "Complete protein",
    photo: {
      url: "https://images.unsplash.com/photo-1482049016681-2f6fad4a4ea4?q=80&w=800&auto=format&fit=crop",
      text: "Eggs for convenient protein",
      pos: "50% 45%",
      by: "Unsplash",
    },
  },
  {
    common: "Curd",
    binomial: "Strained yogurt protein",
    photo: {
      url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop",
      text: "Yogurt bowl",
      pos: "50% 40%",
      by: "Unsplash",
    },
  },
  {
    common: "Chicken",
    binomial: "Lean animal protein",
    photo: {
      url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop",
      text: "Grilled chicken",
      pos: "50% 40%",
      by: "Unsplash",
    },
  },
  {
    common: "Fish",
    binomial: "Lean protein + omega-3s",
    photo: {
      url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
      text: "Cooked fish fillet",
      pos: "50% 45%",
      by: "Unsplash",
    },
  },
  {
    common: "Soya / tofu",
    binomial: "Plant protein staple",
    photo: {
      url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
      text: "Plant-based protein plate",
      pos: "50% 40%",
      by: "Unsplash",
    },
  },
  {
    common: "Meal prep",
    binomial: "Protein-forward plates",
    photo: {
      url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
      text: "Healthy prepared meals",
      pos: "50% 35%",
      by: "Unsplash",
    },
  },
];

export default function CircularGalleryDemo() {
  return (
    <div className="w-full bg-background text-foreground" style={{ height: "400vh" }}>
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-20 z-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Food gallery
          </h1>
          <p className="text-muted-foreground">Scroll to rotate</p>
        </div>
        <div className="h-full w-full">
          <CircularGallery
            items={FITNESS_GALLERY_ITEMS}
            radius={480}
            autoRotateSpeed={0.025}
          />
        </div>
      </div>
    </div>
  );
}
