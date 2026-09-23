import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool";
import { authenticate, authorize } from "../middleware/auth";
import { recordAudit } from "../services/auditLog";
import {
  EXERCISE_DIFFICULTIES,
  MUSCLE_GROUPS,
} from "../constants/knowledgeContent";
import { mapExercise } from "../utils/knowledgeMappers";
import {
  normalizeSlugInput,
  slugFromTitle,
} from "../utils/articleSlug";

export const exercisesRouter = Router();

const exerciseBodySchema = z.object({
  muscleGroup: z.enum(MUSCLE_GROUPS),
  title: z.string().min(1).max(200),
  slug: z.string().max(100).optional().nullable(),
  excerpt: z.string().max(600).optional().default(""),
  quickAnswer: z.string().max(2000).optional().default(""),
  bodyHtml: z.string().optional().default(""),
  formCues: z.array(z.string().max(300)).max(20).optional().default([]),
  commonMistakes: z.array(z.string().max(300)).max(20).optional().default([]),
  programmingNotes: z.string().max(4000).optional().default(""),
  equipment: z.array(z.string().max(80)).max(20).optional().default([]),
  difficulty: z.enum(EXERCISE_DIFFICULTIES).optional().default("intermediate"),
  primaryMuscles: z.array(z.string().max(80)).max(12).optional().default([]),
  secondaryMuscles: z.array(z.string().max(80)).max(12).optional().default([]),
  metaTitle: z.string().max(250).optional().default(""),
  metaDescription: z.string().max(320).optional().default(""),
  status: z.enum(["draft", "published"]).optional().default("draft"),
  robotsIndex: z.boolean().optional().default(true),
  sortOrder: z.number().int().min(0).max(10_000).optional().default(0),
});

exercisesRouter.use(authenticate, authorize("admin", "editor"));

exercisesRouter.get("/", async (req, res) => {
  const group =
    typeof req.query.group === "string" ? req.query.group : undefined;
  const status =
    typeof req.query.status === "string" ? req.query.status : undefined;

  const clauses: string[] = [];
  const params: unknown[] = [];

  if (group && (MUSCLE_GROUPS as readonly string[]).includes(group)) {
    params.push(group);
    clauses.push(`muscle_group = $${params.length}`);
  }
  if (status === "draft" || status === "published") {
    params.push(status);
    clauses.push(`status = $${params.length}`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const result = await pool.query(
    `SELECT * FROM exercises ${where}
     ORDER BY muscle_group ASC, sort_order ASC, title ASC`,
    params,
  );
  res.json({ exercises: result.rows.map(mapExercise) });
});

exercisesRouter.get("/:id", async (req, res) => {
  const result = await pool.query(`SELECT * FROM exercises WHERE id = $1`, [
    req.params.id,
  ]);
  if (!result.rows[0]) {
    res.status(404).json({ message: "Exercise not found" });
    return;
  }
  res.json({ exercise: mapExercise(result.rows[0]) });
});

exercisesRouter.post("/", async (req, res) => {
  const parsed = exerciseBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid exercise payload", issues: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  const slug =
    normalizeSlugInput(data.slug) || slugFromTitle(data.title) || "exercise";
  const publishedAt = data.status === "published" ? new Date() : null;

  try {
    const result = await pool.query(
      `INSERT INTO exercises (
        muscle_group, slug, title, excerpt, quick_answer, body_html,
        form_cues, common_mistakes, programming_notes, equipment, difficulty,
        primary_muscles, secondary_muscles, meta_title, meta_description,
        status, robots_index, sort_order, published_at
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19
      ) RETURNING *`,
      [
        data.muscleGroup,
        slug,
        data.title,
        data.excerpt,
        data.quickAnswer,
        data.bodyHtml,
        data.formCues,
        data.commonMistakes,
        data.programmingNotes,
        data.equipment,
        data.difficulty,
        data.primaryMuscles,
        data.secondaryMuscles,
        data.metaTitle || data.title,
        data.metaDescription || data.excerpt,
        data.status,
        data.robotsIndex,
        data.sortOrder,
        publishedAt,
      ],
    );
    const exercise = mapExercise(result.rows[0]);
    await recordAudit(req, {
      action: "exercise.create",
      entityType: "exercise",
      entityId: String(exercise.id),
      summary: `Created exercise ${exercise.title}`,
    });
    res.status(201).json({ exercise });
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code === "23505") {
      res.status(409).json({ message: "Slug already exists in this muscle group" });
      return;
    }
    throw err;
  }
});

exercisesRouter.patch("/:id", async (req, res) => {
  const existing = await pool.query(`SELECT * FROM exercises WHERE id = $1`, [
    req.params.id,
  ]);
  if (!existing.rows[0]) {
    res.status(404).json({ message: "Exercise not found" });
    return;
  }

  const parsed = exerciseBodySchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid exercise payload", issues: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  const row = existing.rows[0];

  const muscleGroup = data.muscleGroup ?? row.muscle_group;
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
      `UPDATE exercises SET
        muscle_group = $1,
        slug = $2,
        title = $3,
        excerpt = COALESCE($4, excerpt),
        quick_answer = COALESCE($5, quick_answer),
        body_html = COALESCE($6, body_html),
        form_cues = COALESCE($7, form_cues),
        common_mistakes = COALESCE($8, common_mistakes),
        programming_notes = COALESCE($9, programming_notes),
        equipment = COALESCE($10, equipment),
        difficulty = COALESCE($11, difficulty),
        primary_muscles = COALESCE($12, primary_muscles),
        secondary_muscles = COALESCE($13, secondary_muscles),
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
        muscleGroup,
        slug,
        title,
        data.excerpt,
        data.quickAnswer,
        data.bodyHtml,
        data.formCues,
        data.commonMistakes,
        data.programmingNotes,
        data.equipment,
        data.difficulty,
        data.primaryMuscles,
        data.secondaryMuscles,
        data.metaTitle,
        data.metaDescription,
        status,
        data.robotsIndex,
        data.sortOrder,
        publishedAt,
        req.params.id,
      ],
    );
    const exercise = mapExercise(result.rows[0]);
    await recordAudit(req, {
      action: "exercise.update",
      entityType: "exercise",
      entityId: String(exercise.id),
      summary: `Updated exercise ${exercise.title}`,
    });
    res.json({ exercise });
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code === "23505") {
      res.status(409).json({ message: "Slug already exists in this muscle group" });
      return;
    }
    throw err;
  }
});

exercisesRouter.delete("/:id", async (req, res) => {
  const result = await pool.query(
    `DELETE FROM exercises WHERE id = $1 RETURNING id, title`,
    [req.params.id],
  );
  if (!result.rows[0]) {
    res.status(404).json({ message: "Exercise not found" });
    return;
  }
  await recordAudit(req, {
    action: "exercise.delete",
    entityType: "exercise",
    entityId: String(result.rows[0].id),
    summary: `Deleted exercise ${result.rows[0].title}`,
  });
  res.status(204).send();
});
