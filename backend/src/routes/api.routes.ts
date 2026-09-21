import { Router } from "express";
import { authRouter } from "./auth.routes";
import { articlesRouter } from "./articles.routes";
import { briefsRouter } from "./briefs.routes";
import { adminRouter } from "./admin.routes";
import { publicRouter } from "./public.routes";
import { uploadsRouter } from "./uploads.routes";
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
apiRouter.use("/notifications", notificationsRouter);
apiRouter.use("/redirects", redirectsRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/uploads", uploadsRouter);
