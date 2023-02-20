const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const router = require("../app");
const db = require("../src/database/models");
chai.use(chaiHttp);
let token;
let defaultUser = {
  email: "ullas.raj13@gmail.com",
  password: "Ullas@123",
  name: "ullas",
  profileName: "ullas",
};
let loginUser = {
  email: "ullas.raj13@gmail.com",
  password: "Ullas@123",
};

describe("Testing the user endpoints:", () => {
  before((done) => {
    chai
      .request(router)
      .post("/api/v1/user/")
      .send(defaultUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  before((done) => {
    chai
      .request(router)
      .post("/api/v1/user/login")
      .send(loginUser)
      .end((err, res) => {
        token = res.body.data.accessToken;
        res.should.have.status(200);
        done();
      });
  });
  after((done) => {
    db.User.destroy({ where: {} }).then((err) => {
      done();
    });
  });
  describe("User registration endpoints: ", () => {
    it("It should not register user with incomplete parameters", (done) => {
      const user = {
        email: "ullasraj1998@gmail.com",
        name: "ullasraj",
      };
      chai
        .request(router)
        .post("/api/v1/user/")
        .set("Accept", "application/json")
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(412);
          done();
        });
    });
  });
  describe("/following", (done) => {
    it("should fetch all following user id successfully", (done) => {
      chai
        .request(router)
        .get("/api/v1/user/following")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
