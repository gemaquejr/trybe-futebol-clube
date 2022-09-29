import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import User from "../database/models/User";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testando a rota login", () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, "findOne").resolves({ id: 1, role: "admin", email: "teste@test.com", password: "123456" } as unknown as User) });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it("POST/login SUCESSO", async () => {
    chaiHttpResponse = await chai.request(app).post("/login").send({
      email: "teste@test.com",
      password: "123456",
    });

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it("POST/login SUCESSO, retorna o token", async () => {
    chaiHttpResponse = await chai.request(app).post("/login").send({
      email: "teste@test.com",
      password: "123456",
    });

    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it("POST/login ERRO, sem email", async () => {
    chaiHttpResponse = await chai.request(app).post("/login").send({
      email: "",
      password: "$123456",
    });
    expect(chaiHttpResponse.status).to.equal(400);
  });

  it("POST/login ERRO, sem password", async () => {
    chaiHttpResponse = await chai.request(app).post("/login").send({
      email: "teste@test.com",
      password: "",
    });
    expect(chaiHttpResponse.status).to.equal(400);
  });
});
