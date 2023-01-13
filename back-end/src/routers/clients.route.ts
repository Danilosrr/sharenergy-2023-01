import { Router } from "express";
import { deleteClient, getClients, postClient, updateClient } from "../controllers/client.controller.js";
import validateToken from "../middlewares/validateToken.js";

const clientRouter = Router();

clientRouter.use(validateToken);
clientRouter.get("/client", getClients);
clientRouter.post("/client", postClient);
clientRouter.put("/client", updateClient);
clientRouter.delete("/client", deleteClient);

export default clientRouter;
