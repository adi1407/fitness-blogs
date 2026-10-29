import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool";
import { authenticate, authorize } from "../middleware/auth";
import { recordAudit } from "../services/auditLog";
import { mapRecipe } from "../utils/knowledgeMappers";
import { revalidateSite } from "../services/revalidateSite";
import { recipePublishGaps } from "../services/recipeGates";

function refreshRecipePages(...recipes: { path: string | null }[]) {
  revalidateSite(["/recipes", ...recipes.map((r) => r.path)], ["knowledge"]);
}
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
  imageUrl: z.union([z.literal(""), z.string().url().startsWith("https://").max(2000)]).optional().default(""),
  imageAlt: z.string().max(200).optional().default(""),
  prepMinutes: z.number().int().min(0).max(10_000).nullable().optional(),
  cookMinutes: z.number().int().min(0).max(10_000).nullable().optional(),
  totalMinutes: z.number().int().min(0).max(20_000).nullable().optional(),
  timeNote: z.string().max(300).optional().default(""),
  servings: z.number().int().min(1).max(100).nullable().optional(),
});

/** 422 with the missing items when a published recipe isn't complete enough for Google's recipe card. */
function publishGateResponse(row: Record<string, unknown>) {
  const recipe = mapRecipe(row);
  if (recipe.status !== "published") return null;
  const gaps = recipePublishGaps(recipe);
  return gaps.length
    ? { message: `Can't publish yet: ${gaps.join("; ")}.`, gaps }
    : null;
}

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

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      `INSERT INTO recipes (
        slug, title, excerpt, quick_answer, body_html, ingredients, steps,
        calories, protein_g, carbs_g, fat_g, cuisine_tags, meal_type,
        meta_title, meta_description, status, robots_index, sort_order, published_at,
        image_url, image_alt, prep_minutes, cook_minutes, total_minutes, time_note, servings, managed_by
      ) VALUES (
        $1,$2,$3,$4,$5,$6::jsonb,$7::jsonb,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,
        $20,$21,$22,$23,$24,$25,$26,'cms'
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
        data.imageUrl,
        data.imageAlt.trim(),
        data.prepMinutes ?? null,
        data.cookMinutes ?? null,
        data.totalMinutes ?? null,
        data.timeNote.trim(),
        data.servings ?? null,
      ],
    );
    const blocked = publishGateResponse(result.rows[0]);
    if (blocked) {
      await client.query("ROLLBACK");
      res.status(422).json(blocked);
      return;
    }
    await client.query("COMMIT");
    const recipe = mapRecipe(result.rows[0]);
    await recordAudit(req, {
      action: "recipe.create",
      entityType: "recipe",
      entityId: String(recipe.id),
      summary: `Created recipe ${recipe.title}`,
    });
    refreshRecipePages(recipe);
    res.status(201).json({ recipe });
  } catch (err: unknown) {
    await client.query("ROLLBACK").catch(() => undefined);
    const code = (err as { code?: string })?.code;
    if (code === "23505") {
      res.status(409).json({ message: "Recipe slug already exists" });
      return;
    }
    throw err;
  } finally {
    client.release();
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

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
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
        image_url = COALESCE($21, image_url),
        image_alt = COALESCE($22, image_alt),
        prep_minutes = CASE WHEN $23::boolean THEN $24::int ELSE prep_minutes END,
        cook_minutes = CASE WHEN $25::boolean THEN $26::int ELSE cook_minutes END,
        total_minutes = CASE WHEN $27::boolean THEN $28::int ELSE total_minutes END,
        time_note = COALESCE($29, time_note),
        servings = CASE WHEN $30::boolean THEN $31::int ELSE servings END,
        managed_by = 'cms',
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
        data.imageUrl,
        data.imageAlt?.trim(),
        data.prepMinutes !== undefined,
        data.prepMinutes ?? null,
        data.cookMinutes !== undefined,
        data.cookMinutes ?? null,
        data.totalMinutes !== undefined,
        data.totalMinutes ?? null,
        data.timeNote?.trim(),
        data.servings !== undefined,
        data.servings ?? null,
      ],
    );
    const blocked = publishGateResponse(result.rows[0]);
    if (blocked) {
      await client.query("ROLLBACK");
      res.status(422).json(blocked);
      return;
    }
    await client.query("COMMIT");
    const recipe = mapRecipe(result.rows[0]);
    await recordAudit(req, {
      action: "recipe.update",
      entityType: "recipe",
      entityId: String(recipe.id),
      summary: `Updated recipe ${recipe.title}`,
    });
    refreshRecipePages(mapRecipe(row), recipe);
    res.json({ recipe });
  } catch (err: unknown) {
    await client.query("ROLLBACK").catch(() => undefined);
    const code = (err as { code?: string })?.code;
    if (code === "23505") {
      res.status(409).json({ message: "Recipe slug already exists" });
      return;
    }
    throw err;
  } finally {
    client.release();
  }
});

recipesRouter.delete("/:id", async (req, res) => {
  const result = await pool.query(
    `DELETE FROM recipes WHERE id = $1 RETURNING *`,
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
  refreshRecipePages(mapRecipe(result.rows[0]));
  res.status(204).send();
});
