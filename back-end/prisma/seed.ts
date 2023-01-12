import Cryptr from "cryptr";
import { prisma } from "./../src/config/database.js";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

const admin = {
  username: process.env.SHARENERGY_ADMIN,
  password: cryptr.encrypt(process.env.SHARENERGY_PASSWORD),
};

async function main() {
  return await prisma.users.create({
    data: admin,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
