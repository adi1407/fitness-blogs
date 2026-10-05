/** Hero covers for the 20 intent articles — order matches the original shot list (b1→b20). */
export const INTENT_ARTICLE_COVERS: Record<string, string> = {
  "how-much-protein-do-you-need-per-day":
    ".webp",
  "how-many-calories-should-i-eat-to-lose-weight":
    ".webp",
  "how-to-calculate-your-calorie-deficit":
    ".webp",
  "how-much-protein-to-build-muscle":
    ".webp",
  // b5.png was not among the dropped files — add chicken-100g-hero.png then restore this path.
  // "100g-chicken-breast-calories-and-protein":
  //   ".webp",
  "100g-paneer-calories-and-protein":
    ".webp",
  "2-eggs-calories-and-protein": ".webp",
  "rice-vs-roti-for-weight-loss": ".webp",
  "best-indian-foods-for-weight-loss":
    ".webp",
  "best-high-protein-indian-foods":
    ".webp",
  "how-to-lose-belly-fat": ".webp",
  "how-many-calories-should-i-eat-to-lose-10-kg":
    ".webp",
  "how-much-water-should-you-drink":
    ".webp",
  "is-rice-good-for-weight-loss":
    ".webp",
  "is-paneer-good-for-weight-loss":
    ".webp",
  "best-breakfast-for-weight-loss":
    ".webp",
  "best-dinner-for-weight-loss": ".webp",
  "protein-before-or-after-workout":
    ".webp",
  "how-long-does-it-take-to-build-muscle":
    ".webp",
  "beginner-gym-diet-plan":
    ".webp",
  // walking-weight-loss-hero.png was never added — the cover is set in the CMS instead.
  "what-is-progressive-overload":
    ".webp",
};

export function coverForSlug(slug: string): string {
  return INTENT_ARTICLE_COVERS[slug] ?? "";
}
