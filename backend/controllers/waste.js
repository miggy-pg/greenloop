const Waste = require("../models/Waste");

exports.fetchWastes = async (req, res) => {
  try {
    const listing = await Waste.find({});
    const wasteData = Promise.all(
      listing.map(async (waste) => {
        return {
          waste: {
            post: waste.post,
            wasteCategory: waste.wasteCategory,
            image: waste.image,
            user: waste.user,
            createdAt: waste.createdAt,
          },
        };
      })
    );

    res.status(200).json(await wasteData);
  } catch (error) {
    console.log("Error", error);
  }
};

exports.postWasteImage = async (req, res) => {
  try {
    const { post, wasteCategory, user } = req.body;
    const image = req.file ? req.file.filename : "";
    const newWaste = await Waste.create({ post, wasteCategory, image, user });
    res.json(newWaste);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.fetchWaste = async (req, res) => {
  try {
    const waste = await Waste.find();
    res.json(waste);
  } catch (error) {
    console.log(error, "Error");
  }
};
