const express = require("express");
const app = express();

const prodOrigin = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const devOrigin = ["http://localhost:5173"];
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

const dotenv = require("dotenv");
dotenv.config();

// Connect DB
const db = require("./db/connection");

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: false }));

const socket = require("./controllers/socket");

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/waste"));
app.use("/api", require("./routes/conversation"));
app.use("/api", require("./routes/message"));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome");
});

module.exports = app;