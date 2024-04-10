const { Router } = require("express");
const {
  postWasteImage,
  deleteWaste,
  fetchWastes,
  updateWaste,
  wasteAvailableOrNot,
} = require("./waste.controller");

const wasteRouter = Router();

/*
| CRUD Operation             | HTTP Method  | Route                  |
|----------------------------|--------------|------------------------|
| Create Waste Item          | POST         | /v1/wastes/            |
| Fetch All Wastes           | GET          | /v1/wastes             |
| Fetch Current User Waste   | GET          | /v1/wastes/:userId     |
*/

wasteRouter.post("/wastes", postWasteImage);
wasteRouter.get("/wastes", fetchWastes);
wasteRouter.put("/wastes/:wasteId", updateWaste);
wasteRouter.put("/wastes/:wasteId/availability", wasteAvailableOrNot);
wasteRouter.delete("/wastes/:wasteId", deleteWaste);

module.exports = wasteRouter;
