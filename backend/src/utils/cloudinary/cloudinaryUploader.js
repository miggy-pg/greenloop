const cloudinary = require("./cloudinaryConnect");

const cloudinaryUploader = async (image, folder, width, crop) => {
  try {
    if (
      !image ||
      typeof image !== "string" ||
      !folder ||
      typeof folder !== "string" ||
      !width ||
      typeof width !== "number" ||
      !crop ||
      typeof crop !== "string"
    ) {
      throw new Error("Invalid input parameters for image upload");
    }

    const cloudinaryImage = await cloudinary.uploader.upload(image, {
      folder,
      width,
      crop,
    });

    return {
      imageUrl: cloudinaryImage.secure_url,
      publicId: cloudinaryImage.public_id,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = cloudinaryUploader;
