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

// TODO: Create middleware for checking if login is admin

const checkPasswordDoesNotMatch = async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      res.status(400).send("Passwords do not match");
    }
    next();
  } catch (err) {
    console.error("Error checking password match:", err);
    return res.status(500).send("Internal Server Error");
  }
};

const checkRequiredFieldsAreNotEmpty = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).send("Please fill all required fields");
    }
    next();
  } catch (err) {
    console.error("Error checking required fields:", err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  registerValidationMiddleware: {
    checkUsernameAndEmailAvailability,
    checkPasswordDoesNotMatch,
    checkRequiredFieldsAreNotEmpty,
  },
};
