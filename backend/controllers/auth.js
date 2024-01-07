const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

exports.registerUser = async (req, res, next) => {
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
    } = req.body;

    if (password !== confirmPassword) {
      res.status(400).send("Password does not match");
    }

    if (!username || !email || !password) {
      res.status(400).send("Please fill all required fields");
    } else {
      const userNameExist = await Users.findOne({ username });
      const emailExist = await Users.findOne({ email });
      if (userNameExist || emailExist) {
        res
          .status(400)
          .send(`${userNameExist ? "Username " : "Email "}already exists`);
      } else {
        const newUser = new Users({
          companyName,
          email,
          username,
          password,
          organizationType,
          province,
          cityMunicipality,
          token,
        });

        bcryptjs.hash(password, 10, (err, hashedPassword) => {
          newUser.set("password", hashedPassword);
          newUser.save();
          next();
        });
        return res.status(200).send("Company registered successfully");
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(400)
        .send(`Please fill ${!username ? "username" : "password"}}`);
    } else {
      const user = await Users.findOne({ username });
      if (!user) {
        res.status(400).send("Username or password is incorrect");
      } else {
        const validateUser = await bcryptjs.compare(password, user.password);
        if (!validateUser) {
          res.status(400).send("Username or password is incorrect");
        } else {
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
                  cityMunicipality: user.cityMunicipality,
                },
                token: token,
              });
            }
          );
        }
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
};
