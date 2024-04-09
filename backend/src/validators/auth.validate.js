const Users = require("../models/user.model");

const checkUsernameAndEmailAvailability = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const existingUser = await Users.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      const errorMessage =
        existingUser.username === username ? "Username" : "Email";
      return res.status(400).send(`${errorMessage} already exists`);
    }
    next(); // Proceed to the next middleware if user does not exist
  } catch (error) {
    console.error("Error checking duplicate user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  checkUsernameAndEmailAvailability,
};
