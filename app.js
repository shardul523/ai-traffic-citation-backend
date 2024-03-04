const express = require("express");
const apiRouter = require("./routers");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

module.exports = app;
