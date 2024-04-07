const express = require("express");

const authRouter = require("./auth/auth.router");
const userRouter = require("./user/user.router");
const wasteRouter = require("./waste/waste.router");
const conversationRouter = require("./conversation/conversation.router");
const messageRouter = require("./message/message.router");

const api = express.Router();

api.use("/v1", authRouter);
api.use("/v1", userRouter);
api.use("/v1", wasteRouter);
api.use("/v1", conversationRouter);
api.use("/v1", messageRouter);

module.exports = api;
