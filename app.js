const express = require("express");
const router = require("./router");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});

app.use(require("cors")());
app.use("/api", router);

module.exports = app;
