import { Request, Response } from "express";
import { User } from "../interfaces/users.interfaces.js";
import { userServices } from "../services/users.service.js";

export async function signIn(req: Request, res: Response) {
  const user: User = req.body;

  const login = await userServices.signInService(user);

  res.status(200).send(login);
}
