const Users = require("../models/company.model");

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
    next();
  } catch (error) {
    console.error("Error checking duplicate user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const checkPasswordDoesNotMatch = async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }
  next();
};

module.exports = {
  checkUsernameAndEmailAvailability,
};
