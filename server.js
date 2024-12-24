const express = require("express");
const router = express.Router();
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const apiUrl = process.env.URL || "https://jsonplaceholder.typicode.com";
router.get("/posts", (req, res) => {
  try {
    chai
      .request(apiUrl)
      .get("/posts")
      .end((err, apiResponse) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Failed to fetch data from external API" });
        }

        res.status(apiResponse.status).json(apiResponse.body);
      });
  } catch (e) {
    console.error(e);
    res.json({ status: "error", message: "Error" });
  }
});

module.exports = router;
