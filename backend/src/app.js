const express = require("express");
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");
const { apiV1Router } = require("./routes/api");
dotenv.config();

const prodOrigin = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const devOrigin = [process.env.DEV_ORIGIN];
const allowedOrigins =
  process.env.NODE_ENV === "production" ? prodOrigin : devOrigin;

app.use(function (req, res, next) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, UPDATE, PATCH"
  );
  next();
});

app.use(morgan("combined"));

require("./routes/socket/socket.controller");

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: false }));

app.use("/v1", apiV1Router);

app.get("/", (req, res) => {
  res.send("Welcome");
});

module.exports = app;
