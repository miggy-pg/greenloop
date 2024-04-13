const { Router } = require("express");
const { conversation, userConversation } = require("./conversation.controller");

const conversationRouter = Router();

/*
| CRUD Operation            | HTTP Method  | Route                       |
|---------------------------|--------------|-----------------------------|
| Create Conversation       | POST         | /v1/conversations          |
| Fetch User's Conversation | GET          | /v1/conversationsign-in    |
*/

conversationRouter.post("/conversations", conversation);
conversationRouter.get("/conversations/:companyId", userConversation);

module.exports = conversationRouter;
