const Waste = require("../../models/waste.model");
const Users = require("../../models/user.model");
const {
  cloudinaryUploader,
  cloudinaryDelete,
} = require("../../utils/cloudinary/cloudinaryUploader");

const wasteItems = (user, waste) => {
  return (
    waste && {
      user: user,
      id: waste?._id,
      post: waste?.post,
      wasteCategory: waste?.wasteCategory,
      image: waste?.image,
      available: waste?.available,
      createdAt: waste?.createdAt,
    }
  );
};

fetchWastes = async (req, res) => {
  try {
    const wastes = await Waste.find().sort({ createdAt: -1 });

    const wasteData = Promise.all(
      wastes.map(async (waste) => {
        const user = await Users.findById(waste.user);
        return wasteItems(user, waste);
      })
    );

    res.status(200).json(await wasteData);
  } catch (err) {
    console.log("Error: ", err);
  }
};

createWaste = async (req, res) => {
  try {
    const { post, image, wasteCategory, user } = req.body;
    const { imageUrl, publicId } = await cloudinaryUploader(
      image,
      process.env.WASTE_IMAGE_FOLDER,
      process.env.WASTE_IMAGE_SIZE,
      process.env.RESIZE_TYPE
    );

    const newWaste = await Waste.create({
      post,
      wasteCategory,
      image: {
        url: imageUrl,
        public_id: publicId,
      },
      user,
    });
    res.status(201).json(newWaste);
  } catch (err) {
    console.err("Error: ", err);
    res.status(500).json(err);
  }
};

updateWaste = async (req, res) => {
  try {
    const { post, wasteCategory, image } = req.body;
    const wasteId = req.params.wasteId;

    const waste = await Waste.findById(wasteId);
    if (waste) {
      // let newImage;
      // if (image?.length > 0) {
      //   newImage =
      // }
      const { imageUrl, publicId } = await cloudinaryUploader(
        image,
        process.env.WASTE_IMAGE_FOLDER,
        process.env.WASTE_IMAGE_SIZE,
        process.env.RESIZE_TYPE
      );
      // if (waste?.image?.public_id !== newImage?.public_id) {
      //   await Cloudinary.uploader.destroy(waste.image.public_id);
      //   waste.image = {
      //     url: newImage?.secure_url,
      //     public_id: newImage?.public_id,
      //   };
      // }
      await cloudinaryDelete(waste?.image?.public_id, newImage?.public_id);
      waste.post = post;
      waste.wasteCategory = wasteCategory;
    }
    await waste.save({ validateBeforeSave: false });
    res.status(200).json(waste);
  } catch (err) {
    res.status(500).json(err);
    console.log("Error: ", err);
  }
};

deleteWaste = async (req, res) => {
  try {
    await Waste.findByIdAndDelete(req.params.wasteId);
    res.status(200).send("Waste deleted successfully");
  } catch (err) {
    console.log("Error", err);
  }
};

checkWasteAvailableOrNot = async (req, res) => {
  try {
    const wasteId = req.params.wasteId;
    const { available } = req.body;
    const waste = await Waste.updateOne(
      { _id: wasteId },
      {
        $set: { available: Boolean(available) },
      }
    );
    console.log("wasteUpdatedAvailable: ", waste);
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = {
  fetchWastes,
  createWaste,
  updateWaste,
  deleteWaste,
  checkWasteAvailableOrNot,
};
