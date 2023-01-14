import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { badRequestError, invalidTokenError, unauthorizedError } from "./errorHandler.js";
import { usersRepository } from "../repositories/users.repository.js";
import { Token } from "../interfaces/users.interfaces.js";

export default async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const secretKey = process.env.JWT_KEY;

  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) throw unauthorizedError("missing token");

  jwt.verify(token, secretKey, function (err) {
    if (err) throw invalidTokenError("invalid token");
  });

  const tokenJSON = jwt.decode(token) as Token;

  const user = await usersRepository.findByUsername(tokenJSON.username);
  if (!user) throw badRequestError("mismatched values");

  const infoMatch = tokenJSON.id === user.id;
  if (!infoMatch) throw badRequestError("mismatched values");

  res.locals.token = tokenJSON;

  next();
}
