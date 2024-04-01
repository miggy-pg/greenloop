const { Router } = require("express");
const { registerUser, loginUser, signOutUser } = require("./auth.controller");

const router = Router();

/*
| CRUD Operation       | HTTP Method  | Route              |
|----------------------|--------------|--------------------|
| Create User          | POST         | /api/sign-up       |
| Sign-in User         | POST         | /api/sign-in       |
| Sign-out User        | PATCH        | /api/sign-out       |
*/

router.post("/sign-up", registerUser);

router.post("/sign-in", loginUser);

router.patch("/sign-out/:userId", signOutUser);

module.exports = router;
