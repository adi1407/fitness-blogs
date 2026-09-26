/** Hero covers for the 20 intent articles — order matches the original shot list (b1→b20). */
export const INTENT_ARTICLE_COVERS: Record<string, string> = {
  "how-much-protein-do-you-need-per-day":
    "/images/articles/protein-per-day-hero.png",
  "how-many-calories-should-i-eat-to-lose-weight":
    "/images/articles/calories-lose-weight-hero.png",
  "how-to-calculate-your-calorie-deficit":
    "/images/articles/calorie-deficit-hero.png",
  "how-much-protein-to-build-muscle":
    "/images/articles/protein-build-muscle-hero.png",
  // b5.png was not among the dropped files — add chicken-100g-hero.png then restore this path.
  // "100g-chicken-breast-calories-and-protein":
  //   "/images/articles/chicken-100g-hero.png",
  "100g-paneer-calories-and-protein":
    "/images/articles/paneer-100g-hero.png",
  "2-eggs-calories-and-protein": "/images/articles/two-eggs-hero.png",
  "rice-vs-roti-for-weight-loss": "/images/articles/rice-vs-roti-hero.png",
  "best-indian-foods-for-weight-loss":
    "/images/articles/indian-foods-wl-hero.png",
  "best-high-protein-indian-foods":
    "/images/articles/high-protein-indian-hero.png",
  "how-to-lose-belly-fat": "/images/articles/belly-fat-hero.png",
  "how-many-calories-should-i-eat-to-lose-10-kg":
    "/images/articles/lose-10kg-calories-hero.png",
  "how-much-water-should-you-drink":
    "/images/articles/water-intake-hero.png",
  "is-rice-good-for-weight-loss":
    "/images/articles/rice-weight-loss-hero.png",
  "is-paneer-good-for-weight-loss":
    "/images/articles/paneer-weight-loss-hero.png",
  "best-breakfast-for-weight-loss":
    "/images/articles/breakfast-wl-hero.png",
  "best-dinner-for-weight-loss": "/images/articles/dinner-wl-hero.png",
  "protein-before-or-after-workout":
    "/images/articles/protein-timing-hero.png",
  "how-long-does-it-take-to-build-muscle":
    "/images/articles/build-muscle-timeline-hero.png",
  "beginner-gym-diet-plan":
    "/images/articles/beginner-gym-diet-hero.png",
  "does-walking-help-you-lose-weight":
    "/images/articles/walking-weight-loss-hero.png",
};

export function coverForSlug(slug: string): string {
  return INTENT_ARTICLE_COVERS[slug] ?? "";
}
