import { Router } from "express";
import clientRouter from "./clients.route.js";
import usersRouter from "./users.router.js";

const router = Router();

router.use(usersRouter);
router.use(clientRouter);

export default router;
