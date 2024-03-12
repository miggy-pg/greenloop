const { Router } = require("express");
const {
  postWasteImage,
  fetchUserWaste,
  deleteWaste,
  fetchWastes,
} = require("../controllers/waste");

const router = Router();

/*
| CRUD Operation             | HTTP Method  | Route                   |
|----------------------------|--------------|-------------------------|
| Create Waste Item          | POST         | /api/wastes/new         |
| Fetch All Wastes           | GET          | /api/wastes             |
| Fetch Current User Waste   | GET          | /api/wastes/:userId     |
*/

router.post("/wastes/new", postWasteImage);
router.get("/wastes", fetchWastes);
//router.get("/wastes/:userId", fetchUserWaste);
router.delete("/wastes/:wasteId", deleteWaste);

module.exports = router;
