const Waste = require("../../models/waste.model");
const Company = require("../../models/company.model");
const {
  cloudinaryUploader,
  cloudinaryDelete,
} = require("../../utils/cloudinary/cloudinaryUploader");
const ObjectId = require("mongoose").Types.ObjectId;

const wasteItems = (company, waste) => {
  console.log("company: ", company);
  return (
    waste && {
      company: company,
      id: waste?._id,
      post: waste?.post,
      wasteCategory: waste?.wasteCategory,
      image: waste?.image,
      available: waste?.available,
      createdAt: waste?.createdAt,
    }
  );
};

fetchWaste = async (req, res) => {
  try {
    const companyId = req.params.companyId;

    const wastes = await Waste.find().sort({ createdAt: -1 });

    const wasteData = Promise.all(
      wastes.map(async (waste) => {
        console.log("wasteId: ", waste);
        const company = await Company.findById(companyId);
        console.log("companyHere: ", company);
        return wasteItems(company, waste);
      })
    );

    res.status(200).json(await wasteData);
  } catch (err) {
    res.status(500).json(err);
    console.log("Error: ", err);
  }
};

fetchWastes = async (req, res) => {
  try {
    const wastes = await Waste.find().sort({ createdAt: -1 });

    const wasteData = Promise.all(
      wastes.map(async (waste) => {
        const company = await Company.findById(waste.company);
        return wasteItems(company, waste);
      })
    );

    res.status(200).json(await wasteData);
  } catch (err) {
    res.status(500).json(err);
    console.log("Error: ", err);
  }
};

createWaste = async (req, res) => {
  try {
    const { post, image, wasteCategory, company } = req.body;
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
      company,
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
      const { imageUrl, publicId } = await cloudinaryUploader(
        image,
        process.env.WASTE_IMAGE_FOLDER,
        process.env.WASTE_IMAGE_SIZE,
        process.env.RESIZE_TYPE
      );
      // Delete the previous image from cloudinary
      await cloudinaryDelete(waste?.image?.public_id, publicId);
      waste.image = {
        url: imageUrl,
        public_id: publicId,
      };
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
    await Waste.updateOne(
      { _id: wasteId },
      {
        $set: { available: Boolean(available) },
      }
    );
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
