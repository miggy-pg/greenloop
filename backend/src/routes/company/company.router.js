const { Router } = require("express");
const {
  fetchCompany,
  fetchCompanies,
  deleteCompany,
  updateCompany,
} = require("./company.controller");

const companyRouter = Router();

/*
| CRUD Operation         | HTTP Method | Route                   |
|------------------------|-------------|-------------------------|
| Retrieve All Companies | GET         | /v1/users/              |
| Retrieve One Company   | GET         | /v1/:companyId          |
| Update Company         | POST        | /v1/users/:companyId    |
| Delete Company         | DELETE      | /v1/users/:companyI     |
*/

companyRouter.get("/users", fetchCompanies);
companyRouter.get("/users/:companyId", fetchCompany);
companyRouter.put("/users/:companyId", updateCompany);
companyRouter.delete("/users/:companyId", deleteCompany);

module.exports = companyRouter;
