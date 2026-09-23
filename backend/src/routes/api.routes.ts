import { Router } from "express";
import { authRouter } from "./auth.routes";
import { articlesRouter } from "./articles.routes";
import { briefsRouter } from "./briefs.routes";
import { adminRouter } from "./admin.routes";
import { publicRouter } from "./public.routes";
import { uploadsRouter } from "./uploads.routes";
import { exercisesRouter } from "./exercises.routes";
import { recipesRouter } from "./recipes.routes";
import { knowledgePagesRouter } from "./knowledgePages.routes";
import {
  notificationsRouter,
  redirectsRouter,
} from "./notifications.routes";

export const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  res.json({
    message: "FitKnowledge API",
    clients: ["frontend", "cms"],
    endpoints: [
      "/auth",
      "/articles",
      "/briefs",
      "/exercises",
      "/recipes",
      "/knowledge-pages",
      "/notifications",
      "/redirects",
      "/admin",
      "/public",
      "/uploads",
    ],
  });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/public", publicRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/briefs", briefsRouter);
apiRouter.use("/exercises", exercisesRouter);
apiRouter.use("/recipes", recipesRouter);
apiRouter.use("/knowledge-pages", knowledgePagesRouter);
apiRouter.use("/notifications", notificationsRouter);
apiRouter.use("/redirects", redirectsRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/uploads", uploadsRouter);
