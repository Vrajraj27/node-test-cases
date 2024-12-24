const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();

const publicFolderPath = path.join(__dirname, "public");

if (!fs.existsSync(publicFolderPath)) {
  fs.mkdirSync(publicFolderPath, { recursive: true });
}

fs.chmodSync(publicFolderPath, 0o755);

app.use(express.static("public"));

app.get("/report", (req, res) => {
  const reportPath = path.join(__dirname, "public", "mocha.html");
  res.sendFile(reportPath);
});

const server = require("./server");

app.get("/run-tests", (req, res) => {
  exec("npm run test", () => {
    res.send('Tests executed. <a href="/report">View Report</a>');
  });
});

app.get("/", (req, res) => {
  res.send(
    '<h1>Test Runner</h1><p><a href="/run-tests">Run Tests and View Report</a></p>'
  );
});

app.use("/", server);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
