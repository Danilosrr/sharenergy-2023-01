import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "../../swagger.js";
import { documentationHtml, documentationJson } from "../controllers/docs.controller.js";

const docsRouter = Router();

docsRouter.use("/api-docs", swaggerUi.serve);
docsRouter.get("/api-docs", swaggerUi.setup(swaggerDocument));
docsRouter.get("/swagger", documentationJson);
docsRouter.get("/docs", documentationHtml);

export default docsRouter;
