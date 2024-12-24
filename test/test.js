const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const apiUrl = process.env.URL || "https://jsonplaceholder.typicode.com";

describe("API Test Cases for /posts Endpoint", () => {
  it("should return status code 200", (done) => {
    chai
      .request(apiUrl)
      .get("/posts")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should have correct response body structure", (done) => {
    chai
      .request(apiUrl)
      .get("/posts")
      .end((err, res) => {
        expect(res.body[0]).to.include.keys("userId", "id", "title", "body");
        done();
      });
  });

  it("should return 401 Unauthorized if invalid token provided", (done) => {
    chai
      .request(apiUrl)
      .get("/posts")
      .set("Authorization", "Bearer invalid_token")
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.error).to.equal("Unauthorized");
        done();
      });
  });

  it("should have correct data types for fields", (done) => {
    chai
      .request(apiUrl)
      .get("/posts")
      .end((err, res) => {
        expect(res.body[0].userId).to.be.a("number");
        expect(res.body[0].id).to.be.a("number");
        expect(res.body[0].title).to.be.a("string");
        expect(res.body[0].body).to.be.a("string");
        done();
      });
  });

  it("should return all posts when no query parameters are provided", (done) => {
    chai
      .request(apiUrl)
      .get("/posts")
      .end((err, res) => {
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });
});
