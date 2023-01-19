import supertest from "supertest";
import app from "../../src/app.js";
import { clientsFactory } from "../factories/clients.factory.js";
import { usersFactory } from "../factories/users.factory.js";

const agent = supertest(app);

beforeEach(async () => {
  await usersFactory.clearDatabase();
  await clientsFactory.clearDatabase();
}, 10000);

describe("POST /client", () => {
  const client = clientsFactory.clientBody(true);
  const admin = usersFactory.signinBody();

  it("successful client registration expect status 201", async () => {
    const token = await usersFactory.userToken(admin);

    const response = await agent
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(client);
    expect(response.status).toBe(201);
  });

  it("misvalued token expect status 400", async () => {
    const invalidToken = await usersFactory.invalidToken(admin);

    const response = await agent
      .post("/client")
      .set("Authorization", `Bearer ${invalidToken}`);
    expect(response.status).toBe(400);
  });

  it("missing token expect status 401", async () => {
    const response = await agent.post("/client").set("Authorization", "");
    expect(response.status).toBe(401);
  });

  it("client data conflict expect status 409", async () => {
    const token = await usersFactory.userToken(admin);

    await agent
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(client);
    const response = await agent
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(client);
    expect(response.status).toBe(409);
  });

  it("invalid client data expect status 422", async () => {
    const token = await usersFactory.userToken(admin);
    const invalidClient = clientsFactory.clientBody(false);

    const response = await agent
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidClient);
    expect(response.status).toBe(422);
  });

  it("invalid token expect status 498", async () => {
    const response = await agent
      .post("/client")
      .set("Authorization", "Bearer ");
    expect(response.status).toBe(498);
  });
});

describe("GET /client", () => {
  const client = clientsFactory.clientBody(true);
  const admin = usersFactory.signinBody();

  it("client list expect status 200", async () => {
    const token = await usersFactory.userToken(admin);

    const response = await agent
      .get("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(client);
    expect(response.status).toBe(200);
  });

  it("misvalued token expect status 400", async () => {
    const invalidToken = await usersFactory.invalidToken(admin);

    const response = await agent
      .get("/client")
      .set("Authorization", `Bearer ${invalidToken}`);
    expect(response.status).toBe(400);
  });

  it("missing token expect status 401", async () => {
    const response = await agent.get("/client").set("Authorization", "");
    expect(response.status).toBe(401);
  });

  it("invalid token expect status 498", async () => {
    const response = await agent.get("/client").set("Authorization", "Bearer ");
    expect(response.status).toBe(498);
  });
});

describe("PUT /client", () => {
  const client = clientsFactory.clientBody(true);
  const admin = usersFactory.signinBody();

  it("update client data expect status 200", async () => {
    const token = await usersFactory.userToken(admin);

    const { body } = await agent
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(client);
    const response = await agent
      .put("/client")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...body, address: "address" });
    expect(response.status).toBe(200);
  });

  it("misvalued token expect status 400", async () => {
    const invalidToken = await usersFactory.invalidToken(admin);

    const response = await agent
      .put("/client")
      .set("Authorization", `Bearer ${invalidToken}`);
    expect(response.status).toBe(400);
  });

  it("missing token expect status 401", async () => {
    const response = await agent.put("/client").set("Authorization", "");
    expect(response.status).toBe(401);
  });

  it("client not found expect status 404", async () => {
    const token = await usersFactory.userToken(admin);

    const response = await agent
      .put("/client")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...client, id: clientsFactory.randomHex(24) });
    expect(response.status).toBe(404);
  });

  it("unique data conflict expect status 409", async () => {
    const token = await usersFactory.userToken(admin);
    const newClient = clientsFactory.clientBody(true);

    await agent
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(client);
    const { body } = await agent
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(newClient);
    const response = await agent
      .put("/client")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...body, email: client.email });
    expect(response.status).toBe(409);
  });

  it("invalid client data expect status 422", async () => {
    const token = await usersFactory.userToken(admin);
    const invalidClient = clientsFactory.clientBody(false);

    const response = await agent
      .put("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidClient);
    expect(response.status).toBe(422);
  });

  it("invalid token expect status 498", async () => {
    const response = await agent.put("/client").set("Authorization", "Bearer ");
    expect(response.status).toBe(498);
  });
});

describe("DELETE /client", () => {
  const client = clientsFactory.clientBody(true);
  const admin = usersFactory.signinBody();

  it("delete client expect status 200", async () => {
    const token = await usersFactory.userToken(admin);

    const { body } = await agent
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(client);
    const response = await agent
      .delete("/client")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: body.id });
    expect(response.status).toBe(200);
  });

  it("misvalued token expect status 400", async () => {
    const invalidToken = await usersFactory.invalidToken(admin);

    const response = await agent
      .delete("/client")
      .set("Authorization", `Bearer ${invalidToken}`);
    expect(response.status).toBe(400);
  });

  it("missing token expect status 401", async () => {
    const response = await agent.delete("/client").set("Authorization", "");
    expect(response.status).toBe(401);
  });

  it("client not found expect status 404", async () => {
    const token = await usersFactory.userToken(admin);

    const response = await agent
      .delete("/client")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: clientsFactory.randomHex(24) });
    expect(response.status).toBe(404);
  });

  it("invalid client data expect status 422", async () => {
    const token = await usersFactory.userToken(admin);

    const response = await agent
      .delete("/client")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(422);
  });

  it("invalid token expect status 498", async () => {
    const response = await agent
      .delete("/client")
      .set("Authorization", "Bearer ");
    expect(response.status).toBe(498);
  });
});

afterAll(async () => {
  await usersFactory.clearDatabase();
  await clientsFactory.clearDatabase();
});
