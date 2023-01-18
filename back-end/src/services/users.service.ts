import jwt from "jsonwebtoken";
import { forbiddenError, notFoundError } from "../middlewares/errorHandler.js";
import Cryptr from "cryptr";
import { usersRepository } from "../repositories/users.repository.js";
import { User } from "../interfaces/users.interfaces.js";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

function compare(password: string, encryptedPassword: string) {
  const decryptedPassword = cryptr.decrypt(encryptedPassword);
  if (decryptedPassword === password) return true;
  else return false;
}

async function signInService(user: User) {
  const { username, password } = user;

  const userFound = await usersRepository.findByUsername(username);
  if (!userFound) throw notFoundError("user not found");

  const passwordMatch = compare(password, userFound.password);
  if (!passwordMatch) throw forbiddenError("incorrect password");

  const token = jwt.sign({ username, id: userFound.id }, process.env.JWT_KEY);

  return { token: token };
}

export const userServices = {
  compare,
  signInService,
};
