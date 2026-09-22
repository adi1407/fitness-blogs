import type { GalleryItem } from "@/components/ui/circular-gallery";
import { HUB } from "@/lib/hubImages";

/** Fitness / Indian-food themed gallery (local hub assets). */
export const FITNESS_GALLERY_ITEMS: GalleryItem[] = [
  {
    common: "Paneer",
    binomial: "High-protein dairy",
    photo: {
      url: HUB.indianThali,
      text: "Paneer and Indian thali staples",
      pos: "50% 40%",
      by: "fitlives",
    },
  },
  {
    common: "Dal",
    binomial: "Lentil protein + fiber",
    photo: {
      url: HUB.indianThaliWide,
      text: "Dal and balanced Indian plate",
      pos: "50% 50%",
      by: "fitlives",
    },
  },
  {
    common: "Eggs",
    binomial: "Complete protein",
    photo: {
      url: HUB.healthyBreakfast,
      text: "Breakfast protein staples",
      pos: "50% 45%",
      by: "fitlives",
    },
  },
  {
    common: "Curd",
    binomial: "Dairy protein",
    photo: {
      url: HUB.powerBowl,
      text: "Dairy and balanced bowls",
      pos: "50% 40%",
      by: "fitlives",
    },
  },
  {
    common: "Chicken",
    binomial: "Lean animal protein",
    photo: {
      url: HUB.chickenBowl,
      text: "Grilled chicken protein bowl",
      pos: "50% 40%",
      by: "fitlives",
    },
  },
  {
    common: "Produce",
    binomial: "Micronutrient density",
    photo: {
      url: HUB.produceSpread,
      text: "Fresh vegetables and fruit",
      pos: "50% 45%",
      by: "fitlives",
    },
  },
  {
    common: "Plant bowl",
    binomial: "Plant protein staple",
    photo: {
      url: HUB.veggieBowl,
      text: "Plant-based protein plate",
      pos: "50% 40%",
      by: "fitlives",
    },
  },
  {
    common: "Meal prep",
    binomial: "Protein-forward plates",
    photo: {
      url: HUB.mealPrep,
      text: "Prepared high-protein meals",
      pos: "50% 40%",
      by: "fitlives",
    },
  },
];
