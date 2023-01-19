import supertest from "supertest";
import app from "../../src/app.js";
import { usersFactory } from "../factories/users.factory.js";

const agent = supertest(app);

beforeAll(async () => {
  await usersFactory.clearDatabase();
});

describe("POST /signin", () => {
  const admin = usersFactory.signinBody();
  it("register admin", async () => {
    await usersFactory.createAdmin(admin);
  });

  it("successful login expect status 200", async () => {
    const response = await agent.post("/signin").send(admin);
    expect(response.status).toBe(200);
  });

  it("values missmatch expect status 403", async () => {
    const response = await agent
      .post("/signin")
      .send({ ...admin, password: "" });
    expect(response.status).toBe(403);
  });

  it("user not found expect status 404", async () => {
    const response = await agent
      .post("/signin")
      .send({ ...admin, username: "" });
    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await usersFactory.clearDatabase();
});
