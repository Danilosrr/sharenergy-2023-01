import joi from "joi";
import { ClientId, Client } from "../interfaces/clients.interface";

export const clientIdSchema = joi.object<ClientId>({
  id: joi.string().required(),
  name: joi.string().required(),
  email: joi.string().required(),
  address: joi.string().required(),
  cpf: joi.string().regex(/\d{11}/).required(),
  phone: joi.string().regex(/^[1-9]{2}9\d{8}$/).required()
});

export const clientSchema = joi.object<Client>({
    name: joi.string().required(),
    email: joi.string().required(),
    address: joi.string().required(),
    cpf: joi.string().regex(/\d{11}/).required(),
    phone: joi.string().regex(/^[1-9]{2}9\d{8}$/).required()
});

export const idSchema = joi.object<{id: string}>({
    id: joi.string().required(),
});