const { Router } = require("express");
const {
  conversationMessage,
  message,
  hasReadMessage,
} = require("./message.controller");

const messageRouter = Router();

/*
| CRUD Operation                           | HTTP Method   | Route                             |
|------------------------------------------|---------------|-----------------------------------|
| Fetch Messages from Current Conversation | GET           | /api/messages/:conversationId     |
| Fetch One Message                        | GET           | /api/message/:messageId           |
| Create New Message                       | POST          | /api/message                      |
*/

messageRouter.get("/messages/:conversationId", conversationMessage);
messageRouter.get("/message/:messageId", hasReadMessage);
messageRouter.post("/message", message);

module.exports = messageRouter;
