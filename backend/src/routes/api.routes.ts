import { Router } from "express";
import { authRouter } from "./auth.routes";
import { articlesRouter } from "./articles.routes";
import { adminRouter } from "./admin.routes";
import { publicRouter } from "./public.routes";

export const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  res.json({
    message: "FitKnowledge API",
    clients: ["frontend", "cms"],
    endpoints: ["/auth", "/articles", "/admin", "/public"],
  });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/public", publicRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/admin", adminRouter);
