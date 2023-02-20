const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const router = require("../app");
const db = require("../src/database/models");
const fs = require("fs");
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
let postId;
describe("Testing the post endpoints:", () => {
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
  describe("/createPost", (done) => {
    it("it should create a post", (done) => {
      chai
        .request(router)
        .post("/api/v1/post/createPost")
        .set({ Authorization: `Bearer ${token}` })
        .set("Accept", "application/json")
        .attach("file", fs.readFileSync(`${__dirname}/pic.png`), "pic.png")
        .field("caption", "first post")
        .field("postTypeName", "post")
        .end((err, res) => {
          postId = res.body.data.id;
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe("/getAllPost", (done) => {
    it("it should get all post created by the user", (done) => {
      chai
        .request(router)
        .get("/api/v1/post/")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data[0]).to.have.property("id");
          expect(res.body.data[0]).to.have.property("userId");
          expect(res.body.data[0]).to.have.property("caption");
          expect(res.body.data[0]).to.have.property("postType");
          expect(res.body.data[0]).to.have.property("file");
          done();
        });
    });
  });

  describe("/delete post", (done) => {
    it("it should not delete a post with non-numeric id value", (done) => {
      const postId = "afhch";
      chai
        .request(router)
        .delete(`/api/v1/post/${postId}`)
        .set({ Authorization: `Bearer ${token}` })
        .set("Accept", "application/json")
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it("it should not delete a post with invalid id", (done) => {
      const postId = 77;
      chai
        .request(router)
        .delete(`/api/v1/post/${postId}`)
        .set({ Authorization: `Bearer ${token}` })
        .set("Accept", "application/json")
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it("it should delete a post with id", (done) => {
      chai
        .request(router)
        .delete(`/api/v1/post/${postId}`)
        .set({ Authorization: `Bearer ${token}` })
        .set("Accept", "application/json")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
