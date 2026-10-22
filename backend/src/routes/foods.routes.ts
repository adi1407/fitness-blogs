import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool";
import { FOOD_CATEGORIES } from "../db/foods/types";
import { authenticate, authorize } from "../middleware/auth";
import { recordAudit } from "../services/auditLog";
import { mapCmsFood } from "../utils/knowledgeMappers";
import { revalidateSite } from "../services/revalidateSite";

function refreshFoodPages(...slugs: string[]) {
  revalidateSite(
    ["/foods", "/foods/indian", "/foods/indian/protein-ranking", ...slugs.map((s) => `/foods/${s}`)],
    ["foods"],
  );
}
import {
  normalizeSlugInput,
  slugFromTitle,
} from "../utils/articleSlug";

export const foodsRouter = Router();

const servingSchema = z.object({
  label: z.string().min(1).max(80),
  grams: z.number().positive().max(5000),
});

const foodsBodySchema = z.object({
  name: z.string().min(1).max(120),
  slug: z.string().max(80).optional().nullable(),
  hindiName: z.string().max(120).optional().default(""),
  category: z.enum(FOOD_CATEGORIES),
  diet: z.enum(["veg", "egg", "non-veg"]),
  basisLabel: z.string().max(200).optional().default(""),
  kcal: z.number().min(0).max(900),
  proteinG: z.number().min(0).max(100),
  carbsG: z.number().min(0).max(100),
  fatG: z.number().min(0).max(100),
  fiberG: z.number().min(0).max(100).optional().default(0),
  calciumMg: z.number().min(0).max(5000).nullable().optional(),
  ironMg: z.number().min(0).max(100).nullable().optional(),
  servings: z.array(servingSchema).min(1).max(20),
  source: z.enum(["IFCT 2017", "USDA FoodData Central"]),
  sourceRef: z.string().max(120).optional().default(""),
  sourceName: z.string().max(200).optional().default(""),
  sourceNote: z.string().max(500).optional().default(""),
  intro: z.string().max(8000).optional().default(""),
  tips: z.array(z.string().max(500)).max(20).optional().default([]),
  relatedSlugs: z.array(z.string().max(80)).max(12).optional().default([]),
  compareSlug: z.string().max(80).nullable().optional(),
  imageUrl: z
    .union([z.literal(""), z.string().trim().url().max(500).regex(/^https?:\/\//)])
    .optional()
    .default(""),
  imageAlt: z.string().trim().max(200).optional().default(""),
  published: z.boolean().optional().default(false),
  sortOrder: z.number().int().min(0).max(10_000).optional().default(0),
});

foodsRouter.use(authenticate, authorize("admin", "editor"));

foodsRouter.get("/", async (req, res) => {
  const params: unknown[] = [];
  const clauses: string[] = [];

  const published = typeof req.query.published === "string" ? req.query.published : "";
  if (published === "true" || published === "false") {
    params.push(published === "true");
    clauses.push(`published = $${params.length}`);
  }

  const category = typeof req.query.category === "string" ? req.query.category : "";
  if ((FOOD_CATEGORIES as readonly string[]).includes(category)) {
    params.push(category);
    clauses.push(`category = $${params.length}`);
  }

  const q = typeof req.query.q === "string" ? req.query.q.trim().slice(0, 60) : "";
  if (q) {
    params.push(`%${q.replace(/[%_\\]/g, "\\$&")}%`);
    clauses.push(
      `(name ILIKE $${params.length} OR hindi_name ILIKE $${params.length} OR slug ILIKE $${params.length})`,
    );
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const result = await pool.query(
    `SELECT * FROM foods ${where} ORDER BY category ASC, sort_order ASC, name ASC`,
    params,
  );
  res.json({ foods: result.rows.map(mapCmsFood) });
});

foodsRouter.get("/:id", async (req, res) => {
  const result = await pool.query(`SELECT * FROM foods WHERE id = $1`, [
    req.params.id,
  ]);
  if (!result.rows[0]) {
    res.status(404).json({ message: "Food not found" });
    return;
  }
  res.json({ food: mapCmsFood(result.rows[0]) });
});

foodsRouter.post("/", async (req, res) => {
  const parsed = foodsBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid food payload", issues: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  const slug =
    normalizeSlugInput(data.slug) || slugFromTitle(data.name) || "food";

  try {
    const result = await pool.query(
      `INSERT INTO foods (
        slug, name, hindi_name, category, diet, is_veg, basis_label,
        kcal, protein_g, carbs_g, fat_g, fiber_g, calcium_mg, iron_mg,
        servings, source, source_ref, source_name, source_note,
        intro, tips, related_slugs, compare_slug, published, sort_order, managed_by,
        image_url, image_alt
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,
        $15::jsonb,$16,$17,$18,$19,$20,$21::jsonb,$22,$23,$24,$25,'cms',$26,$27
      ) RETURNING *`,
      [
        slug,
        data.name,
        data.hindiName,
        data.category,
        data.diet,
        data.diet === "veg",
        data.basisLabel,
        data.kcal,
        data.proteinG,
        data.carbsG,
        data.fatG,
        data.fiberG,
        data.calciumMg ?? null,
        data.ironMg ?? null,
        JSON.stringify(data.servings),
        data.source,
        data.sourceRef,
        data.sourceName,
        data.sourceNote,
        data.intro,
        JSON.stringify(data.tips),
        data.relatedSlugs,
        data.compareSlug || null,
        data.published,
        data.sortOrder,
        data.imageUrl,
        data.imageAlt,
      ],
    );
    const food = mapCmsFood(result.rows[0]);
    await recordAudit(req, {
      action: "food.create",
      entityType: "food",
      entityId: String(food.id),
      summary: `Created food ${food.name}`,
    });
    refreshFoodPages(food.slug);
    res.status(201).json({ food });
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code === "23505") {
      res.status(409).json({ message: "Food slug already exists" });
      return;
    }
    throw err;
  }
});

foodsRouter.patch("/:id", async (req, res) => {
  const existing = await pool.query(`SELECT * FROM foods WHERE id = $1`, [
    req.params.id,
  ]);
  if (!existing.rows[0]) {
    res.status(404).json({ message: "Food not found" });
    return;
  }

  const parsed = foodsBodySchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid food payload", issues: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  const row = existing.rows[0];
  const name = data.name ?? row.name;
  const slug =
    data.slug !== undefined
      ? normalizeSlugInput(data.slug) || slugFromTitle(String(name))
      : row.slug;
  const diet = data.diet ?? row.diet;

  try {
    const result = await pool.query(
      `UPDATE foods SET
        slug = $1,
        name = $2,
        hindi_name = COALESCE($3, hindi_name),
        category = COALESCE($4, category),
        diet = $5,
        is_veg = $6,
        basis_label = COALESCE($7, basis_label),
        kcal = COALESCE($8, kcal),
        protein_g = COALESCE($9, protein_g),
        carbs_g = COALESCE($10, carbs_g),
        fat_g = COALESCE($11, fat_g),
        fiber_g = COALESCE($12, fiber_g),
        calcium_mg = COALESCE($13, calcium_mg),
        iron_mg = COALESCE($14, iron_mg),
        servings = COALESCE($15::jsonb, servings),
        source = COALESCE($16, source),
        source_ref = COALESCE($17, source_ref),
        source_name = COALESCE($18, source_name),
        source_note = COALESCE($19, source_note),
        intro = COALESCE($20, intro),
        tips = COALESCE($21::jsonb, tips),
        related_slugs = COALESCE($22, related_slugs),
        compare_slug = COALESCE($23, compare_slug),
        published = COALESCE($24, published),
        sort_order = COALESCE($25, sort_order),
        image_url = COALESCE($27, image_url),
        image_alt = COALESCE($28, image_alt),
        managed_by = 'cms',
        updated_at = NOW()
      WHERE id = $26
      RETURNING *`,
      [
        slug,
        name,
        data.hindiName,
        data.category,
        diet,
        diet === "veg",
        data.basisLabel,
        data.kcal,
        data.proteinG,
        data.carbsG,
        data.fatG,
        data.fiberG,
        data.calciumMg !== undefined ? data.calciumMg : null,
        data.ironMg !== undefined ? data.ironMg : null,
        data.servings !== undefined ? JSON.stringify(data.servings) : null,
        data.source,
        data.sourceRef,
        data.sourceName,
        data.sourceNote,
        data.intro,
        data.tips !== undefined ? JSON.stringify(data.tips) : null,
        data.relatedSlugs !== undefined ? data.relatedSlugs : null,
        data.compareSlug !== undefined ? data.compareSlug || null : null,
        data.published,
        data.sortOrder,
        req.params.id,
        data.imageUrl !== undefined ? data.imageUrl : null,
        data.imageAlt !== undefined ? data.imageAlt : null,
      ],
    );
    const food = mapCmsFood(result.rows[0]);
    await recordAudit(req, {
      action: "food.update",
      entityType: "food",
      entityId: String(food.id),
      summary: `Updated food ${food.name}`,
    });
    refreshFoodPages(String(row.slug), food.slug);
    res.json({ food });
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code === "23505") {
      res.status(409).json({ message: "Food slug already exists" });
      return;
    }
    throw err;
  }
});

foodsRouter.delete("/:id", async (req, res) => {
  const result = await pool.query(
    `DELETE FROM foods WHERE id = $1 RETURNING id, name, slug`,
    [req.params.id],
  );
  if (!result.rows[0]) {
    res.status(404).json({ message: "Food not found" });
    return;
  }
  await recordAudit(req, {
    action: "food.delete",
    entityType: "food",
    entityId: String(result.rows[0].id),
    summary: `Deleted food ${result.rows[0].name}`,
  });
  refreshFoodPages(String(result.rows[0].slug));
  res.status(204).send();
});
