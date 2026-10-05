"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/openpanel";

/** Marks that a visitor opened a food page. */
export function FoodViewBeacon({ slug, category }: { slug: string; category: string }) {
  useEffect(() => {
    trackEvent("food_view", { food: slug, category });
  }, [slug, category]);
  return null;
}
