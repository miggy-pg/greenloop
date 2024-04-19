const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../../models/company.model");
const {
  cloudinaryUploader,
} = require("../../utils/cloudinary/cloudinaryUploader");

registerCompany = async (req, res, next) => {
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

    const { imageUrl, publicId } = await cloudinaryUploader(
      image,
      process.env.USER_IMAGE_FOLDER,
      process.env.USER_IMAGE_SIZE,
      process.env.RESIZE_TYPE
    );

    const createCompany = new Company({
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
      createCompany.set("password", hashedPassword);
      createCompany.save();
      next();
    });
    return res.status(201).send("Company registered successfully");
  } catch (error) {
    console.log(error, "Error");
    res.status(500).send("An error occurred while registering company");
  }
};

loginCompany = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .send(`Please provide a ${!username ? "username" : "password"}`);
    }

    const company = await Company.findOne({ username });
    if (!company) {
      return res.status(401).send("Username or password is incorrect");
    }

    const validateUser = await bcryptjs.compare(password, company.password);
    if (!validateUser) {
      return res.status(401).send("Password is incorrect");
    }

    const payload = {
      companyId: company._id,
      email: company.email,
    };
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY";

    jwt.sign(
      payload,
      JWT_SECRET_KEY,
      { expiresIn: 84600 },
      async (err, token) => {
        await Company.updateOne(
          { _id: company._id },
          {
            $set: { token },
          }
        );
        company.save();

        return res.status(200).json({
          user: {
            id: company._id,
            username: company.username,
            companyName: company.companyName,
            province: company.province,
            organizationType: company.organizationType,
            cityMunicipality: company.cityMunicipality,
            isAdmin: company.isAdmin,
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

signOutCompany = async (req, res) => {
  try {
    await Company.updateOne(
      { _id: req.params?.companyId },
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
  registerCompany,
  loginCompany,
  signOutCompany,
};
