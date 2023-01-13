import { Router } from "express";
import { signIn } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.post("/signin", signIn);

export default usersRouter;
