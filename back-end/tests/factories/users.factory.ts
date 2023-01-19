import { prisma } from "../../src/config/database.js";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import jwt from "jsonwebtoken";
import { User } from "../../src/interfaces/users.interfaces.js";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

async function clearDatabase() {
  await prisma.users.deleteMany();
}

function signinBody() {
  const body = {
    username: faker.random.alphaNumeric(16),
    password: faker.random.alphaNumeric(16),
  };

  return body;
}

async function createAdmin(data: User) {
  const { password } = data;
  return await prisma.users.create({
    data: { ...data, password: cryptr.encrypt(password) },
  });
}

async function userToken(data: User) {
  const { username, id } = await usersFactory.createAdmin(data);
  const token = jwt.sign({ username, id }, process.env.JWT_KEY);
  return token;
}

async function invalidToken(data: User) {
  const token = jwt.sign(data, process.env.JWT_KEY);
  return token;
}

export const usersFactory = {
  clearDatabase,
  signinBody,
  createAdmin,
  userToken,
  invalidToken,
};
