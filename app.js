require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");

const routes = require("./src/routes");
const { logger } = require("./src/utils");
const app = express();

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(fileUpload({ useTempFiles: false }));
app.use("/api/v1", routes);
process.on("uncaughtException", (err) => {
  logger.error(err);
});

process.on("unhandledRejection", (reason) => {
  logger.error(reason);
});

module.exports = app;
