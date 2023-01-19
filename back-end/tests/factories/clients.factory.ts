import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import jwt from "jsonwebtoken";
import { User } from "../../src/interfaces/users.interfaces";
import { usersFactory } from "./users.factory";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

async function clearDatabase() {
  await prisma.clients.deleteMany();
}

function replaceNumber(value: string, index: number, replacement: number) {
  return value.substring(0, index) + replacement + value.substring(index + 1);
}

function clientBody(valid: boolean) {
  const fullName = [faker.name.firstName(), faker.name.lastName()];

  const body = {
    name: `${fullName[0]} ${fullName[1]}`,
    cpf: faker.random.numeric(11),
    email: faker.internet.email(fullName[0], fullName[1]),
    phone: replaceNumber(faker.random.numeric(11, { bannedDigits: "0" }), 2, 9),
    address: faker.address.streetAddress(),
  };

  if (valid) return body;
  else return { ...body, unnecessaryProperty: faker.random.word() };
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

export const clientsFactory = {
  clearDatabase,
  clientBody,
  userToken,
  invalidToken,
};
