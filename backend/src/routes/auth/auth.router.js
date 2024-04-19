const { Router } = require("express");
const {
  registerCompany,
  loginCompany,
  signOutCompany,
} = require("./auth.controller");
const {
  checkUsernameAndEmailAvailability,
} = require("../../validators/auth.validate");

const authRouter = Router();

/*
| CRUD Operation       | HTTP Method  | Route                       |
|----------------------|--------------|-----------------------------|
| Create Company          | POST         | /v1/sign-up                 |
| Sign-in Company         | POST         | /v1/sign-in                 |
| Sign-out Company        | PATCH        | /v1/sign-out/:companyId     |
*/

authRouter.post("/sign-up", checkUsernameAndEmailAvailability, registerCompany);

authRouter.post("/sign-in", loginCompany);

authRouter.patch("/sign-out/:companyId", signOutCompany);

module.exports = authRouter;
