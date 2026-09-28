import { AnimatedMarqueeHero, type MarqueeImage } from "@/components/ui/hero-3";
import { BRAND_SLOGAN } from "@/lib/brand";
import { HUB } from "@/lib/hubImages";

const IMAGES: MarqueeImage[] = [
  { src: HUB.barbellSquat, alt: "Barbell back squat in the gym" },
  { src: HUB.chickenBowl, alt: "High-protein chicken and rice bowl" },
  { src: HUB.outdoorRun, alt: "Runner on a waterfront path at sunset" },
  { src: HUB.indianThali, alt: "Balanced Indian thali" },
  { src: HUB.deadlift, alt: "Conventional deadlift" },
  { src: HUB.saladBowl, alt: "Fresh vegetable salad bowl" },
  { src: HUB.dumbbellRow, alt: "Single-arm dumbbell row" },
  { src: HUB.mealPrep, alt: "Weekly meal-prep containers" },
  { src: HUB.mobilityStretch, alt: "Mobility and stretching session" },
  { src: HUB.powerBowl, alt: "Colourful power bowl" },
  { src: HUB.bicepFocus, alt: "Dumbbell biceps curl" },
  { src: HUB.healthyBreakfast, alt: "Healthy breakfast spread" },
];

export function HomeMarqueeHero() {
  return (
    <AnimatedMarqueeHero
      className="border-b border-border"
      tagline="Evidence-informed fitness for India"
      title={BRAND_SLOGAN}
      description="Clear guides on muscle building, weight loss, and nutrition — plus free calculators and an Indian food database built for real questions."
      cta={{ label: "Browse all guides", href: "/blog" }}
      secondaryCta={{ label: "Free calculators", href: "/tools" }}
      images={IMAGES}
    />
  );
}
