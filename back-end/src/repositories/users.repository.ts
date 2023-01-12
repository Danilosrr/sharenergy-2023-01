import { prisma } from "../config/database.js";

async function findByUsername(username: string) {
  return await prisma.users.findUnique({
    where: { username },
  });
}

export const usersRepository = {
  findByUsername,
};