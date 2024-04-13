const { Router } = require("express");
const {
  createWaste,
  deleteWaste,
  fetchWastes,
  updateWaste,
  checkWasteAvailableOrNot,
} = require("./waste.controller");

const wasteRouter = Router();

/*
| CRUD Operation             | HTTP Method  | Route                  |
|----------------------------|--------------|------------------------|
| Create Waste Item          | POST         | /v1/wastes/            |
| Fetch All Wastes           | GET          | /v1/wastes             |
| Fetch Current User Waste   | GET          | /v1/wastes/:companyId     |
*/

wasteRouter.post("/wastes", createWaste);
wasteRouter.get("/wastes", fetchWastes);
wasteRouter.put("/wastes/:wasteId", updateWaste);
wasteRouter.put("/wastes/:wasteId/availability", checkWasteAvailableOrNot);
wasteRouter.delete("/wastes/:wasteId", deleteWaste);

module.exports = wasteRouter;
