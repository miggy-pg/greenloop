const bcryptjs = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;
const Users = require("../../models/user.model");
const Waste = require("../../models/waste.model");
const cloudinaryUploader = require("../../utils/cloudinary/cloudinaryUploader");

fetchUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userDocument = await Users.findById(new ObjectId(userId));
    const wastes = await Waste.find({ user: userId });
    const user = { ...userDocument._doc, wastes: wastes };
    res.status(200).json(user);
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("An error occurred while fetching user");
  }
};

fetchUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    const allUsers = Promise.all(
      users.map(async (user) => {
        return {
          receiverId: user._id,
          id: user._id,
          email: user.email,
          username: user.username,
          password: user.password,
          companyName: user.companyName,
          organizationType: user.organizationType,
          province: user.province,
          cityMunicipality: user.cityMunicipality,
          image: user.image.url,
          isAdmin: user.isAdmin,
        };
      })
    );

    res.status(200).json(await allUsers);
  } catch (error) {
    console.log("Error", error);
  }
};

updateProfile = async (req, res) => {
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
      isAdmin,
    } = req.body;

    const { imageUrl, publicId } = await cloudinaryUploader(
      image,
      process.env.USER_IMAGE_FOLDER,
      process.env.USER_IMAGE_SIZE,
      process.env.RESIZE_TYPE
    );

    const user = await Users.findById(userId);
    if (user) {
      user.companyName = companyName;
      user.email = email;
      user.username = username;
      user.organizationType = organizationType;
      user.province = province;
      user.cityMunicipality = cityMunicipality;
      user.image = {
        public_id: publicId,
        url: imageUrl,
      };
      user.isAdmin = isAdmin;
    }
    bcryptjs.hash(password, 10, (err, hashedPassword) => {
      user.password = hashedPassword;
      user.save();
    });
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

deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.userId);
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = {
  fetchUser,
  fetchUsers,
  updateProfile,
  deleteUser,
};
