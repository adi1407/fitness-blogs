import {
  MasonryGrid,
  type MasonryCardData,
} from "@/components/ui/masonry-grid-with-scroll-animation";

const demoItems: MasonryCardData[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop",
    alt: "Healthy meal prep",
    content: "Sort of short and tiny amount of content here.",
    linkHref: "/nutrition",
    linkText: "Nutrition guides",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
    alt: "Person training",
    content:
      "The words in this example are tolerable, passable and fair, but do draw out a bit.",
    linkHref: "/weight-loss",
    linkText: "Weight loss hub",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    alt: "Gym weights",
    content: "I'm brief comparatively.",
    linkHref: "/muscle-building",
    linkText: "Muscle building",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop",
    alt: "Exercise library",
    content: "Sometimes the message is just right.",
    linkHref: "/exercises",
    linkText: "Exercise library",
  },
  ...Array.from({ length: 28 }, (_, i) => {
    const pool = [
      {
        src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
        alt: "Fresh vegetables",
        content: "Sometimes the message is just right.",
        linkHref: "/foods/indian",
        linkText: "Indian foods",
      },
      {
        src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop",
        alt: "Fitness calculator",
        content:
          "The words in this example are tolerable, passable and fair, but do draw out a bit.",
        linkHref: "/tools",
        linkText: "Calculators",
      },
      {
        src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop",
        alt: "Balanced plate",
        content: "I'm brief comparatively.",
        linkHref: "/nutrition/protein",
        linkText: "Protein guide",
      },
      {
        src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop",
        alt: "Running outdoors",
        content: "Sort of short and tiny amount of content here.",
        linkHref: "/training",
        linkText: "Training",
      },
    ][i % 4];
    return { ...pool, id: `${i + 5}` };
  }),
];

export default function MasonryGridDemo() {
  return (
    <div className="min-h-[200vh] bg-background py-24">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Animated Masonry Grid
        </h1>
        <p className="mt-2 text-muted-foreground">
          Scroll down to see the items animate into view.
        </p>
      </div>
      <MasonryGrid items={demoItems} />
    </div>
  );
}
