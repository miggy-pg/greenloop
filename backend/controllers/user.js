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
            companyName: user.companyName,
            receiverId: user._id,
            province: user.province,
            cityMunicipality: user.cityMunicipality,
            listings: listing,
          },
        };
      })
    );

    res.status(200).json(await usersData);
  } catch (error) {
    console.log("Error", error);
  }
};
