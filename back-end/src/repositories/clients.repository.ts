import { prisma } from "../config/database.js";
import { Client, ClientId } from "../interfaces/clients.interface.js";

async function createClient(client: Client) {
  return await prisma.clients.create({
    data: client,
  });
}

async function deleteClient(id: string) {
  return await prisma.clients.delete({
    where: { id },
  });
}

async function queryClients() {
  return await prisma.clients.findMany({
    where: {},
  });
}

async function updateClient(client: ClientId) {
  const { id, ...data } = client;
  return await prisma.clients.update({
    where: { id },
    data: data,
  });
}

async function findByEmail(email: string) {
  return await prisma.clients.findUnique({
    where: { email },
  });
}

async function findByName(name: string) {
  return await prisma.clients.findUnique({
    where: { name },
  });
}

async function findByCpf(cpf: string) {
  return await prisma.clients.findUnique({
    where: { cpf },
  });
}

async function findById(id: string) {
  return await prisma.clients.findUnique({
    where: { id },
  });
}

export const clientsRepository = {
  createClient,
  deleteClient,
  queryClients,
  updateClient,
  findByEmail,
  findByName,
  findByCpf,
  findById,
};
