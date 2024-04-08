const express = require("express");
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

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

app.use(morgan("combined"));

require("./routes/socket/socket.controller");

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: false }));

const authRouter = require("./routes/auth/auth.router");
const userRouter = require("./routes/user/user.router");
const wasteRouter = require("./routes/waste/waste.router");
const conversationRouter = require("./routes/conversation/conversation.router");
const messageRouter = require("./routes/message/message.router");

// app.use("/api", authRouter);
// app.use("/api", userRouter);
// app.use("/api", wasteRouter);
// app.use("/api", conversationRouter);
// app.use("/api", messageRouter);

app.get("/", (req, res) => {
  res.send("Welcome");
});

module.exports = app;
