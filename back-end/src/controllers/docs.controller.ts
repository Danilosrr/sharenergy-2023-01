import { Request, Response } from "express";
import { swaggerDocument } from "../../swagger.js";

export async function documentationJson(req: Request, res: Response) {
  const swaggerJson = JSON.stringify(swaggerDocument);
  return res.send(swaggerJson);
}

export async function documentationHtml(req: Request, res: Response) {
  return res.sendFile(process.cwd() + "/index.html");
}
