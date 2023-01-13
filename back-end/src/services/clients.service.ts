import { Client, ClientId } from "../interfaces/clients.interface.js";
import { clientsRepository } from "../repositories/clients.repository.js";
import { notFoundError, unauthorizedError } from "../middlewares/errorHandler.js";

async function createClient(client: Client) {
  const checkName = await clientsRepository.findByName(client.name);
  if (checkName) throw unauthorizedError("name already in use!");

  const checkCpf = await clientsRepository.findByCpf(client.cpf);
  if (checkCpf) throw unauthorizedError("cpf already in use!");

  const checkEmail = await clientsRepository.findByEmail(client.email);
  if (checkEmail) throw unauthorizedError("email already in use!");

  const newClient = await clientsRepository.createClient(client);
  return newClient;
}

async function updateClient(client: ClientId) {
  const checkId = await clientsRepository.findById(client.id);
  if (!checkId) throw notFoundError("client not found!");

  const checkName = await clientsRepository.findByName(client.name);
  if (checkName && checkName.id != client.id)
    throw unauthorizedError("name already in use!");

  const checkCpf = await clientsRepository.findByCpf(client.cpf);
  if (checkCpf && checkCpf.id != client.id)
    throw unauthorizedError("cpf already in use!");

  const checkEmail = await clientsRepository.findByEmail(client.email);
  if (checkEmail && checkEmail.id != client.id)
    throw unauthorizedError("email already in use!");

  const updatedClient = await clientsRepository.updateClient(client);
  return updatedClient;
}

async function deleteClient(id: string) {
  const checkId = await clientsRepository.findById(id);
  if (!checkId) throw notFoundError("client not found!");

  const deletedClient = await clientsRepository.deleteClient(id);
  return deletedClient;
}

async function allClients() {
  const clients = await clientsRepository.queryClients();
  return clients;
}

export const clientServices = {
  createClient,
  updateClient,
  deleteClient,
  allClients,
};
