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
| Retrieve All Users | GET         | /api/users/        |
| Retrieve One User  | GET         | /api/:userId       |
| Update User        | POST        | /api/users/:id     |
| Delete User        | DELETE      | /api/users/:id     |
*/

userRouter.get("/users", fetchUsers);
userRouter.get("/users/:userId", fetchUser);
userRouter.put("/users/:userId", updateProfile);
userRouter.delete("/users/:userId", deleteUser);

module.exports = userRouter;
