import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import cors from "cors";
import router from "./routers/router.js";
import handleErrors from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(handleErrors);

export default app;
