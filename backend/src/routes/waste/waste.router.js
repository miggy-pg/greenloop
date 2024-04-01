const { Router } = require("express");
const {
  postWasteImage,
  fetchUserWaste,
  deleteWaste,
  fetchWastes,
  updateWaste,
} = require("./waste");

const wasteRouter = Router();

/*
| CRUD Operation             | HTTP Method  | Route                   |
|----------------------------|--------------|-------------------------|
| Create Waste Item          | POST         | /api/wastes/new         |
| Fetch All Wastes           | GET          | /api/wastes             |
| Fetch Current User Waste   | GET          | /api/wastes/:userId     |
*/

wasteRouter.post("/wastes/new", postWasteImage);
wasteRouter.get("/wastes", fetchWastes);
wasteRouter.put("/wastes/update/:wasteId", updateWaste);
wasteRouter.delete("/wastes/:wasteId", deleteWaste);

module.exports = wasteRouter;
