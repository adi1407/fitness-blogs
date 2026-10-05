import { Router, type Response } from "express";
import { pool } from "../db/pool";
import { FOOD_CATEGORIES } from "../db/foods/types";

export const publicFoodsRouter = Router();

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function cache(res: Response) {
  res.set("Cache-Control", "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400");
}

function n(v: unknown): number {
  return Number(v ?? 0);
}

function mapFoodSummary(row: Record<string, unknown>) {
  const servings = (row.servings as { label: string; grams: number }[]) ?? [];
  return {
    slug: row.slug as string,
    name: row.name as string,
    hindiName: row.hindi_name as string,
    category: row.category as string,
    diet: row.diet as string,
    basisLabel: row.basis_label as string,
    kcal: n(row.kcal),
    proteinG: n(row.protein_g),
    carbsG: n(row.carbs_g),
    fatG: n(row.fat_g),
    fiberG: n(row.fiber_g),
    defaultServing: servings[0] ?? null,
    updatedAt: row.updated_at,
  };
}

function mapFood(row: Record<string, unknown>) {
  return {
    ...mapFoodSummary(row),
    calciumMg: row.calcium_mg == null ? null : n(row.calcium_mg),
    ironMg: row.iron_mg == null ? null : n(row.iron_mg),
    servings: row.servings,
    source: row.source,
    sourceRef: row.source_ref,
    sourceName: row.source_name,
    sourceNote: row.source_note,
    intro: row.intro,
    tips: row.tips,
    compareSlug: row.compare_slug,
  };
}

publicFoodsRouter.get("/", async (req, res) => {
  const params: unknown[] = [];
  const clauses = ["published = TRUE"];
  const category = typeof req.query.category === "string" ? req.query.category : "";
  if ((FOOD_CATEGORIES as readonly string[]).includes(category)) {
    params.push(category);
    clauses.push(`category = $${params.length}`);
  }
  const diet = typeof req.query.diet === "string" ? req.query.diet : "";
  if (diet === "veg" || diet === "egg" || diet === "non-veg") {
    params.push(diet);
    clauses.push(`diet = $${params.length}`);
  }
  const q = typeof req.query.q === "string" ? req.query.q.trim().slice(0, 60) : "";
  if (q) {
    params.push(`%${q.replace(/[%_\\]/g, "\\$&")}%`);
    clauses.push(`(name ILIKE $${params.length} OR hindi_name ILIKE $${params.length} OR slug ILIKE $${params.length})`);
  }
  const result = await pool.query(
    `SELECT * FROM foods WHERE ${clauses.join(" AND ")} ORDER BY category, sort_order, name`,
    params,
  );
  cache(res);
  res.json({ foods: result.rows.map(mapFoodSummary) });
});

publicFoodsRouter.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  if (!SLUG_RE.test(slug) || slug.length > 80) {
    res.status(404).json({ message: "Food not found" });
    return;
  }
  const result = await pool.query(`SELECT * FROM foods WHERE slug = $1 AND published = TRUE LIMIT 1`, [slug]);
  const row = result.rows[0];
  if (!row) {
    res.status(404).json({ message: "Food not found" });
    return;
  }

  const curated: string[] = row.related_slugs ?? [];
  const relatedRes = await pool.query(
    `SELECT * FROM foods
     WHERE published = TRUE AND slug <> $1
       AND (slug = ANY($2::text[]) OR category = $3 OR slug = $4)
     ORDER BY array_position($2::text[], slug) NULLS LAST, sort_order
     LIMIT 12`,
    [slug, curated, row.category, row.compare_slug ?? ""],
  );
  const others = relatedRes.rows.map(mapFoodSummary);
  const compare = row.compare_slug
    ? (relatedRes.rows.find((r) => r.slug === row.compare_slug) ?? null)
    : null;

  cache(res);
  res.json({
    food: mapFood(row),
    compare: compare ? mapFood(compare) : null,
    related: others.filter((f) => f.slug !== row.compare_slug).slice(0, 6),
  });
});
