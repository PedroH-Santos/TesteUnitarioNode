import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { app } from "../../../../app";
import createConnection from "../../../../database";

let connection: Connection;

describe("Show user profile", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to show the user profile", async () => {

    const response = await request(app)
    .post("/api/v1/users").send({
      name : "Pedro",
      email: "pedro@gmail.com",
      password: "1234"
    });

    expect(response.status).toBe(201);
  });
});
