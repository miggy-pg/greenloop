const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../../models/user.model");
const {
  cloudinaryUploader,
} = require("../../utils/cloudinary/cloudinaryUploader");

const UPLOADED_IMAGE_PATH = "users/profile";
const IMAGE_SIZE = 300;
const IMAGE_RESIZE_TYPE = "scale";

registerUser = async (req, res, next) => {
  try {
    const {
      companyName,
      email,
      username,
      password,
      confirmPassword,
      organizationType,
      province,
      cityMunicipality,
      token,
      image,
      isAdmin,
      onAdminCreated,
    } = req.body;

    // We added onAdmin to the condition since we are using the same function for user registration
    if (!onAdminCreated && password !== confirmPassword) {
      res.status(400).send("Password does not match");
    }
    if (!username || !email || !password) {
      res.status(400).send("Please fill all required fields");
    }

    const { imageUrl, publicId } = await cloudinaryUploader(
      image,
      UPLOADED_IMAGE_PATH,
      IMAGE_SIZE,
      IMAGE_RESIZE_TYPE
    );

    const createUser = new Users({
      companyName,
      email,
      username,
      password,
      organizationType,
      province,
      cityMunicipality,
      token,
      image: {
        url: imageUrl,
        public_id: publicId,
      },
      isAdmin,
    });

    bcryptjs.hash(password, 10, (err, hashedPassword) => {
      createUser.set("password", hashedPassword);
      createUser.save();
      next();
    });
    return res.status(201).send("Company registered successfully");
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("An error occurred while registering company");
  }
};

loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .send(`Please provide a ${!username ? "username" : "password"}`);
    }

    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(401).send("Username or password is incorrect");
    }

    const validateUser = await bcryptjs.compare(password, user.password);
    if (!validateUser) {
      return res.status(401).send("Password is incorrect");
    }

    const payload = {
      userId: user._id,
      email: user.email,
    };
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY";

    jwt.sign(
      payload,
      JWT_SECRET_KEY,
      { expiresIn: 84600 },
      async (err, token) => {
        await Users.updateOne(
          { _id: user._id },
          {
            $set: { token },
          }
        );
        user.save();

        return res.status(200).json({
          user: {
            id: user._id,
            username: user.username,
            companyName: user.companyName,
            province: user.province,
            organizationType: user.organizationType,
            cityMunicipality: user.cityMunicipality,
            isAdmin: user.isAdmin,
          },
          token: token,
        });
      }
    );
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send("An error occurred while logging in");
  }
};

signOutUser = async (req, res) => {
  try {
    await Users.updateOne(
      { _id: req.params?.userId },
      {
        $set: { token: null },
      }
    );

    return res
      .status(200)
      .clearCookie("token ", { httpOnly: true })
      .json({ sucess: true, message: "User has been successfully signed out" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  signOutUser,
};
