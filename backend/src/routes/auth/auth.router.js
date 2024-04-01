const { Router } = require("express");
const { registerUser, loginUser, signOutUser } = require("./auth.controller");

const authRouter = Router();

/*
| CRUD Operation       | HTTP Method  | Route              |
|----------------------|--------------|--------------------|
| Create User          | POST         | /api/sign-up       |
| Sign-in User         | POST         | /api/sign-in       |
| Sign-out User        | PATCH        | /api/sign-out       |
*/

authRouter.post("/sign-up", registerUser);

authRouter.post("/sign-in", loginUser);

authRouter.patch("/sign-out/:userId", signOutUser);

module.exports = authRouter;
