const Waste = require("../models/Waste");
const Users = require("../models/Users");
const Cloudinary = require("../utils/cloudinary");

exports.fetchWastes = async (req, res) => {
  try {
    const listing = await Waste.find({});
    const wasteData = Promise.all(
      listing.map(async (waste) => {
        const user = await Users.findById(waste.user);
        // console.log("user: ");
        return {
          user: user,
          post: waste.post,
          wasteCategory: waste.wasteCategory,
          image: waste.image,
          createdAt: waste.createdAt,
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
    const { post, image, wasteCategory, user } = req.body;
    console.log("postWasteImage: ", image);
    let wasteImage;
    if (image?.length > 0) {
      wasteImage = await Cloudinary.uploader.upload(image, {
        folder: "wastes",
        width: 450,
        crop: "scale",
      });
    }

    const newWaste = await Waste.create({
      post,
      wasteCategory,
      image: {
        url: wasteImage?.secure_url,
        public_id: wasteImage?.public_id,
      },
      user,
    });
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
