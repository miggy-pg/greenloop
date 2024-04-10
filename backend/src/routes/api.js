const express = require("express");
const apiV1Router = express.Router();

const authRouter = require("./auth/auth.router");
const userRouter = require("./user/user.router");
const wasteRouter = require("./waste/waste.router");
const conversationRouter = require("./conversation/conversation.router");
const messageRouter = require("./message/message.router");

apiV1Router.use("/", authRouter);
apiV1Router.use("/", userRouter);
apiV1Router.use("/", wasteRouter);
apiV1Router.use("/", conversationRouter);
apiV1Router.use("/", messageRouter);

module.exports = { apiV1Router };
