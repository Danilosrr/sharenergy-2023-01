import { Router } from "express";
import clientRouter from "./clients.route.js";
import docsRouter from "./docs.route.js";
import usersRouter from "./users.router.js";

const router = Router();

router.use(docsRouter);
router.use(usersRouter);
router.use(clientRouter);

export default router;
