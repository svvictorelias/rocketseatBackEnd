import { app } from "@shared/infra/http/app";
import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
let connection: Connection;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuidV4();
    const password = await hash("admin", 8);
    await connection.query(
      `INSERT INTO USERS(id,name,email,password,"isAdmin",created_at,driver_license) values('${id}','admin','admin@mail.com','${password}',true,'now()','XXXXXXX')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@mail.com",
      password: "admin"
    });
    const { token } = responseToken.body;
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category teste",
        description: "Description teste"
      })
      .set({
        Authorization: `Bearer ${token}`
      });
    expect(response.status).toBe(201);
  });
});
