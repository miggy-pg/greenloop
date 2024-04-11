const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryUploader = async (image, folder, width, crop) => {
  try {
    if (!image) return { imageUrl: "", publicId: "" };

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

const cloudinaryDelete = async (oldPublicId, newPublicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { cloudinaryUploader, cloudinaryDelete };
