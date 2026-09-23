import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool";
import { authenticate, authorize } from "../middleware/auth";
import { recordAudit } from "../services/auditLog";
import { mapRecipe } from "../utils/knowledgeMappers";
import {
  normalizeSlugInput,
  slugFromTitle,
} from "../utils/articleSlug";

export const recipesRouter = Router();

const recipesBodySchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().max(100).optional().nullable(),
  excerpt: z.string().max(600).optional().default(""),
  quickAnswer: z.string().max(2000).optional().default(""),
  bodyHtml: z.string().optional().default(""),
  ingredients: z.array(z.unknown()).max(60).optional().default([]),
  steps: z.array(z.unknown()).max(40).optional().default([]),
  calories: z.number().int().min(0).max(5000).nullable().optional(),
  proteinG: z.number().min(0).max(500).nullable().optional(),
  carbsG: z.number().min(0).max(800).nullable().optional(),
  fatG: z.number().min(0).max(400).nullable().optional(),
  cuisineTags: z.array(z.string().max(60)).max(20).optional().default([]),
  mealType: z.string().max(60).optional().default(""),
  metaTitle: z.string().max(250).optional().default(""),
  metaDescription: z.string().max(320).optional().default(""),
  status: z.enum(["draft", "published"]).optional().default("draft"),
  robotsIndex: z.boolean().optional().default(true),
  sortOrder: z.number().int().min(0).max(10_000).optional().default(0),
});

recipesRouter.use(authenticate, authorize("admin", "editor"));

recipesRouter.get("/", async (req, res) => {
  const status =
    typeof req.query.status === "string" ? req.query.status : undefined;
  const params: unknown[] = [];
  let where = "";
  if (status === "draft" || status === "published") {
    params.push(status);
    where = `WHERE status = $1`;
  }
  const result = await pool.query(
    `SELECT * FROM recipes ${where} ORDER BY sort_order ASC, title ASC`,
    params,
  );
  res.json({ recipes: result.rows.map(mapRecipe) });
});

recipesRouter.get("/:id", async (req, res) => {
  const result = await pool.query(`SELECT * FROM recipes WHERE id = $1`, [
    req.params.id,
  ]);
  if (!result.rows[0]) {
    res.status(404).json({ message: "Recipe not found" });
    return;
  }
  res.json({ recipe: mapRecipe(result.rows[0]) });
});

recipesRouter.post("/", async (req, res) => {
  const parsed = recipesBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid recipe payload", issues: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  const slug =
    normalizeSlugInput(data.slug) || slugFromTitle(data.title) || "recipe";
  const publishedAt = data.status === "published" ? new Date() : null;

  try {
    const result = await pool.query(
      `INSERT INTO recipes (
        slug, title, excerpt, quick_answer, body_html, ingredients, steps,
        calories, protein_g, carbs_g, fat_g, cuisine_tags, meal_type,
        meta_title, meta_description, status, robots_index, sort_order, published_at
      ) VALUES (
        $1,$2,$3,$4,$5,$6::jsonb,$7::jsonb,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19
      ) RETURNING *`,
      [
        slug,
        data.title,
        data.excerpt,
        data.quickAnswer,
        data.bodyHtml,
        JSON.stringify(data.ingredients),
        JSON.stringify(data.steps),
        data.calories ?? null,
        data.proteinG ?? null,
        data.carbsG ?? null,
        data.fatG ?? null,
        data.cuisineTags,
        data.mealType,
        data.metaTitle || data.title,
        data.metaDescription || data.excerpt,
        data.status,
        data.robotsIndex,
        data.sortOrder,
        publishedAt,
      ],
    );
    const recipe = mapRecipe(result.rows[0]);
    await recordAudit(req, {
      action: "recipe.create",
      entityType: "recipe",
      entityId: String(recipe.id),
      summary: `Created recipe ${recipe.title}`,
    });
    res.status(201).json({ recipe });
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code === "23505") {
      res.status(409).json({ message: "Recipe slug already exists" });
      return;
    }
    throw err;
  }
});

recipesRouter.patch("/:id", async (req, res) => {
  const existing = await pool.query(`SELECT * FROM recipes WHERE id = $1`, [
    req.params.id,
  ]);
  if (!existing.rows[0]) {
    res.status(404).json({ message: "Recipe not found" });
    return;
  }

  const parsed = recipesBodySchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid recipe payload", issues: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  const row = existing.rows[0];
  const title = data.title ?? row.title;
  const slug =
    data.slug !== undefined
      ? normalizeSlugInput(data.slug) || slugFromTitle(String(title))
      : row.slug;
  const status = data.status ?? row.status;
  let publishedAt = row.published_at;
  if (status === "published" && !publishedAt) publishedAt = new Date();
  if (status === "draft") publishedAt = null;

  try {
    const result = await pool.query(
      `UPDATE recipes SET
        slug = $1,
        title = $2,
        excerpt = COALESCE($3, excerpt),
        quick_answer = COALESCE($4, quick_answer),
        body_html = COALESCE($5, body_html),
        ingredients = COALESCE($6::jsonb, ingredients),
        steps = COALESCE($7::jsonb, steps),
        calories = COALESCE($8, calories),
        protein_g = COALESCE($9, protein_g),
        carbs_g = COALESCE($10, carbs_g),
        fat_g = COALESCE($11, fat_g),
        cuisine_tags = COALESCE($12, cuisine_tags),
        meal_type = COALESCE($13, meal_type),
        meta_title = COALESCE($14, meta_title),
        meta_description = COALESCE($15, meta_description),
        status = $16,
        robots_index = COALESCE($17, robots_index),
        sort_order = COALESCE($18, sort_order),
        published_at = $19,
        updated_at = NOW()
      WHERE id = $20
      RETURNING *`,
      [
        slug,
        title,
        data.excerpt,
        data.quickAnswer,
        data.bodyHtml,
        data.ingredients !== undefined
          ? JSON.stringify(data.ingredients)
          : null,
        data.steps !== undefined ? JSON.stringify(data.steps) : null,
        data.calories,
        data.proteinG,
        data.carbsG,
        data.fatG,
        data.cuisineTags,
        data.mealType,
        data.metaTitle,
        data.metaDescription,
        status,
        data.robotsIndex,
        data.sortOrder,
        publishedAt,
        req.params.id,
      ],
    );
    const recipe = mapRecipe(result.rows[0]);
    await recordAudit(req, {
      action: "recipe.update",
      entityType: "recipe",
      entityId: String(recipe.id),
      summary: `Updated recipe ${recipe.title}`,
    });
    res.json({ recipe });
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code === "23505") {
      res.status(409).json({ message: "Recipe slug already exists" });
      return;
    }
    throw err;
  }
});

recipesRouter.delete("/:id", async (req, res) => {
  const result = await pool.query(
    `DELETE FROM recipes WHERE id = $1 RETURNING id, title`,
    [req.params.id],
  );
  if (!result.rows[0]) {
    res.status(404).json({ message: "Recipe not found" });
    return;
  }
  await recordAudit(req, {
    action: "recipe.delete",
    entityType: "recipe",
    entityId: String(result.rows[0].id),
    summary: `Deleted recipe ${result.rows[0].title}`,
  });
  res.status(204).send();
});
