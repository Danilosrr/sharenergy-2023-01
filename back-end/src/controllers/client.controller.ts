import { Request, Response } from "express";
import { Client, ClientId } from "../interfaces/clients.interface.js";
import { clientServices } from "../services/clients.service.js";

export async function postClient(req: Request, res: Response) {
  const client: Client = req.body;
  const newClient = await clientServices.createClient(client);
  res.status(201).send(newClient);
}

export async function getClients(req: Request, res: Response) {
  const allClients = await clientServices.allClients();
  res.status(200).send(allClients);
}

export async function updateClient(req: Request, res: Response) {
  const client: ClientId = req.body;
  const updatedClient = await clientServices.updateClient(client);
  res.status(200).send(updatedClient);
}

export async function deleteClient(req: Request, res: Response) {
  const { id }: { id: string } = req.body;
  const deletedClient = await clientServices.deleteClient(id);
  res.status(200).send(deletedClient);
}
