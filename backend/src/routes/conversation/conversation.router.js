const { Router } = require("express");
const { conversation, userConversation } = require("./conversation.controller");

const conversationRouter = Router();

/*
| CRUD Operation            | HTTP Method  | Route                       |
|---------------------------|--------------|-----------------------------|
| Create Conversation       | POST         | /api/conversations          |
| Fetch User's Conversation | GET          | /api/conversationsign-in    |
*/

conversationRouter.post("/conversations", conversation);
conversationRouter.get("/conversations/:userId", userConversation);

module.exports = conversationRouter;
