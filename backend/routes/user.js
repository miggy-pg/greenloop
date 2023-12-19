const require = require("express");
const router = express.Router();
const { fetchUser } = require("../controllers/user");

router.get("/user/:userId", fetchUser);

exports.userRouter = router;
