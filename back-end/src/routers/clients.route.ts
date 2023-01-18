import { Router } from "express";
import { deleteClient, getClients, postClient, updateClient } from "../controllers/client.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/validateToken.js";
import { clientIdSchema, clientSchema, idSchema } from "../schemas/clients.schema.js";

const clientRouter = Router();

clientRouter.use(validateToken);
clientRouter.get("/client", getClients);
clientRouter.post("/client", validateSchema(clientSchema), postClient);
clientRouter.put("/client", validateSchema(clientIdSchema), updateClient);
clientRouter.delete("/client", validateSchema(idSchema), deleteClient);

export default clientRouter;
