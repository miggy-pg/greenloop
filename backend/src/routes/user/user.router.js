const { Router } = require("express");
const {
  fetchUser,
  fetchUsers,
  deleteUser,
  updateProfile,
} = require("./user.controller");

const userRouter = Router();

/*
| CRUD Operation     | HTTP Method | Route              |
|--------------------|-------------|--------------------|
| Retrieve All Users | GET         | /v1/users/        |
| Retrieve One User  | GET         | /v1/:userId       |
| Update User        | POST        | /v1/users/:id     |
| Delete User        | DELETE      | /v1/users/:id     |
*/

userRouter.get("/users", fetchUsers);
userRouter.get("/users/:userId", fetchUser);
userRouter.put("/users/:userId", updateProfile);
userRouter.delete("/users/:userId", deleteUser);

module.exports = userRouter;
