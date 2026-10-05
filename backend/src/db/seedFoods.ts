import { pool } from "./pool";
import { foodsBatch1 } from "./foods/batch1";
import { foodsBatch2 } from "./foods/batch2";
import { foodsBatch3 } from "./foods/batch3";
import { foodsBatch4 } from "./foods/batch4";
import { foodsBatch5 } from "./foods/batch5";
import type { FoodSeed } from "./foods/types";

const FOODS: FoodSeed[] = [
  ...foodsBatch1,
  ...foodsBatch2,
  ...foodsBatch3,
  ...foodsBatch4,
  ...foodsBatch5,
];

/** Upsert seeded foods by slug so corrections in the seed files reach production on deploy. */
export async function seedFoods(): Promise<void> {
  const slugs = new Set<string>();
  for (const [i, f] of FOODS.entries()) {
    if (slugs.has(f.slug)) throw new Error(`[foods] duplicate slug ${f.slug}`);
    slugs.add(f.slug);
    await pool.query(
      `INSERT INTO foods (
        slug, name, hindi_name, category, diet, is_veg, basis_label,
        kcal, protein_g, carbs_g, fat_g, fiber_g, calcium_mg, iron_mg,
        servings, source, source_ref, source_name, source_note,
        intro, tips, related_slugs, compare_slug, published, sort_order
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,
        $15::jsonb,$16,$17,$18,$19,$20,$21::jsonb,$22,$23,TRUE,$24
      )
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        hindi_name = EXCLUDED.hindi_name,
        category = EXCLUDED.category,
        diet = EXCLUDED.diet,
        is_veg = EXCLUDED.is_veg,
        basis_label = EXCLUDED.basis_label,
        kcal = EXCLUDED.kcal,
        protein_g = EXCLUDED.protein_g,
        carbs_g = EXCLUDED.carbs_g,
        fat_g = EXCLUDED.fat_g,
        fiber_g = EXCLUDED.fiber_g,
        calcium_mg = EXCLUDED.calcium_mg,
        iron_mg = EXCLUDED.iron_mg,
        servings = EXCLUDED.servings,
        source = EXCLUDED.source,
        source_ref = EXCLUDED.source_ref,
        source_name = EXCLUDED.source_name,
        source_note = EXCLUDED.source_note,
        intro = EXCLUDED.intro,
        tips = EXCLUDED.tips,
        related_slugs = EXCLUDED.related_slugs,
        compare_slug = EXCLUDED.compare_slug,
        sort_order = EXCLUDED.sort_order,
        updated_at = CASE
          WHEN (foods.kcal, foods.protein_g, foods.carbs_g, foods.fat_g, foods.servings, foods.intro, foods.tips)
             IS DISTINCT FROM
               (EXCLUDED.kcal, EXCLUDED.protein_g, EXCLUDED.carbs_g, EXCLUDED.fat_g, EXCLUDED.servings, EXCLUDED.intro, EXCLUDED.tips)
          THEN NOW() ELSE foods.updated_at END`,
      [
        f.slug,
        f.name,
        f.hindiName,
        f.category,
        f.diet,
        f.diet === "veg",
        f.basisLabel,
        f.kcal,
        f.proteinG,
        f.carbsG,
        f.fatG,
        f.fiberG,
        f.calciumMg,
        f.ironMg,
        JSON.stringify(f.servings),
        f.source,
        f.sourceRef,
        f.sourceName,
        f.sourceNote ?? "",
        f.intro,
        JSON.stringify(f.tips),
        f.relatedSlugs,
        f.compareSlug ?? null,
        i,
      ],
    );
  }
}
