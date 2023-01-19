import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";

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

async function clientId(name: string) {
  return await prisma.clients.findUnique({ where: { name } });
}

function randomHex(size: number) {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}

export const clientsFactory = {
  clearDatabase,
  clientBody,
  clientId,
  randomHex,
};
