exports.fetchUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await Users.find({ _id: { $ne: userId } });
    const listing = await Waste.find({ user: userId });
    const usersData = Promise.all(
      users.map(async (user) => {
        return {
          user: {
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

    res.status(200).json(await usersData);
  } catch (error) {
    console.log("Error", error);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId: ", userId);
    const {
      companyName,
      email,
      username,
      password,
      organizationType,
      province,
      cityMunicipality,
    } = req.body;

    const user = await Users.findById(userId);
    if (user) {
      user.companyName = companyName;
      user.email = email;
      user.username = username;
      user.password = password;
      user.organizationType = organizationType;
      user.province = province;
      user.cityMunicipality = cityMunicipality;
    }

    const updatedUser = await user.save();
    console.log("updatedUser: ", updatedUser);

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
