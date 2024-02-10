const Cloudinary = require("../utils/cloudinary");
const Users = require("../models/Users");
const Waste = require("../models/Waste");

exports.fetchUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await Users.find({ _id: userId });
    const wastes = await Waste.find({ user: userId });
    const usersData = Promise.all(
      users.map(async (user) => {
        return {
          userId: user._id,
          email: user.email,
          username: user.username,
          password: user.password,
          companyName: user.companyName,
          organizationType: user.organizationType,
          province: user.province,
          cityMunicipality: user.cityMunicipality,
          image: user.image.url,
          wastes: wastes,
        };
      })
    );
    res.status(200).json(await usersData);
  } catch (error) {
    console.log("Error", error);
  }
};

exports.fetchUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    const usersData = Promise.all(
      users.map(async (user) => {
        return {
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
            password: user.password,
            companyName: user.companyName,
            receiverId: user._id,
            organizationType: user.organizationType,
            province: user.province,
            cityMunicipality: user.cityMunicipality,
          },
        };
      })
    );

    res.status(200).json(await usersData);
  } catch (error) {
    console.log("Error", error);
  }
};

exports.fetchUserWaste = async (req, res) => {
  try {
    const { userId } = req.body;
    const listing = await Waste.find({ user: userId });
    const wasteData = Promise.all(
      listing.map(async (waste) => {
        return {
          waste: {
            post: waste.post,
            wasteCategory: waste.wasteCategory,
            image: waste.image,
            user: waste.user,
          },
        };
      })
    );

    res.status(200).json(wasteData);
  } catch (error) {
    console.log("Error", error);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const {
      companyName,
      email,
      image,
      username,
      password,
      organizationType,
      province,
      cityMunicipality,
    } = req.body;

    let result;
    if (image?.length > 0) {
      result = await Cloudinary.uploader.upload(image, {
        folder: "users/profile",
        width: 300,
        crop: "scale",
      });
    }
    const user = await Users.findById(userId);
    if (user) {
      user.companyName = companyName;
      user.email = email;
      user.username = username;
      user.password = password;
      user.organizationType = organizationType;
      user.province = province;
      user.cityMunicipality = cityMunicipality;
      user.image = {
        public_id: result?.public_id,
        url: result?.secure_url,
      };
    }
    console.log("userupdateProfile: ", user);
    const updatedUser = await user.save();

    res.status(200).json({
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        companyName: updatedUser.companyName,
        password: updatedUser.password,
        email: updatedUser.email,
        province: updatedUser.province,
        cityMunicipality: updatedUser.cityMunicipality,
        organizationType: updatedUser.organizationType,
      },
      token: updatedUser.token,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.userId);
  } catch (error) {
    console.log("Error", error);
  }
};
