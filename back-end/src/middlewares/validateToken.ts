import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { badRequestError, unauthorizedError } from "./errorHandler";
import { usersRepository } from "../repositories/users.repository";
import { Token } from "../interfaces/users.interfaces";

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
    if (err) throw unauthorizedError("invalid token");
  });

  const tokenJSON = jwt.decode(token) as Token;

  const user = await usersRepository.findByUsername(tokenJSON.username);
  if (!user) throw badRequestError("mismatched values");

  const infoMatch = tokenJSON.id === user.id;
  if (!infoMatch) throw badRequestError("mismatched values");

  res.locals.token = tokenJSON;

  next();
}
