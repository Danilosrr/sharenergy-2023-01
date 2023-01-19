import supertest from "supertest";
import app from "../../src/app.js";
import { clientsFactory } from "../factories/clients.factory.js";
import { usersFactory } from "../factories/users.factory.js";

const agent = supertest(app);

beforeAll(async () => {
  await usersFactory.clearDatabase();
  await clientsFactory.clearDatabase();
});

describe("POST /client", () => {
  const client = clientsFactory.clientBody(true);

  it("successful client registration expect status 201", async () => {
    const admin = usersFactory.signinBody();
    const token = await clientsFactory.userToken(admin);

    const response = await agent
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(client);
    expect(response.status).toBe(201);
  });

  it("misvalued token expect status 400", async () => {
    const admin = usersFactory.signinBody();
    const invalidToken = await clientsFactory.invalidToken(admin);

    const response = await agent
      .post("/client")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(client);
    expect(response.status).toBe(400);
  });

  it("missing token expect status 401", async () => {
    const response = await agent.post("/client").send(client);
    expect(response.status).toBe(401);
  });

  it("client data conflict expect status 409", async () => {
    const admin = usersFactory.signinBody();
    const token = await clientsFactory.userToken(admin);

    const response = await agent
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(client);
    expect(response.status).toBe(409);
  });

  const invalidClient = clientsFactory.clientBody(false);
  it("invalid client data registration expect status 422", async () => {
    const admin = usersFactory.signinBody();
    const token = await clientsFactory.userToken(admin);

    const response = await agent
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidClient);
    expect(response.status).toBe(422);
  });

  it("invalid token expect status 498", async () => {
    const response = await agent
      .post("/client")
      .set("Authorization", "Bearer ")
      .send(client);
    expect(response.status).toBe(498);
  });
});

afterAll(async () => {
  await usersFactory.clearDatabase();
  await clientsFactory.clearDatabase();
});
