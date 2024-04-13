const bcryptjs = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;
const Company = require("../../models/company.model");
const Waste = require("../../models/waste.model");
const {
  cloudinaryUploader,
  cloudinaryDelete,
} = require("../../utils/cloudinary/cloudinaryUploader");

fetchCompany = async (req, res) => {
  try {
    // const companyId = req.params.userId;
    const companyId = req.params.companyId;
    const companyDocument = await Company.findById(new ObjectId(companyId));
    const wastes = await Waste.find({ company: companyId });
    const company = { ...companyDocument._doc, wastes: wastes };
    res.status(200).json(company);
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("An error occurred while fetching company");
  }
};

fetchCompanies = async (req, res) => {
  try {
    const company = await Company.find({});
    const allCompany = Promise.all(
      company.map(async (company) => {
        return {
          receiverId: company._id,
          id: company._id,
          email: company.email,
          username: company.username,
          password: company.password,
          companyName: company.companyName,
          organizationType: company.organizationType,
          province: company.province,
          cityMunicipality: company.cityMunicipality,
          image: company.image.url,
          isAdmin: company.isAdmin,
        };
      })
    );

    res.status(200).json(await allCompany);
  } catch (error) {
    console.log("Error", error);
  }
};

updateCompany = async (req, res) => {
  try {
    const companyId = req.params.userId;
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

    const company = await Company.findById(companyId);
    // Delete the previous image from Cloudinary
    await cloudinaryDelete(company?.image?.public_id, publicId);

    if (company) {
      company.companyName = companyName;
      company.email = email;
      company.username = username;
      company.organizationType = organizationType;
      company.province = province;
      company.cityMunicipality = cityMunicipality;
      company.image = {
        public_id: publicId,
        url: imageUrl,
      };
      company.isAdmin = isAdmin;
    }
    bcryptjs.hash(password, 10, (err, hashedPassword) => {
      company.password = hashedPassword;
      company.save();
    });
    const updatedCompany = await company.save();

    res.status(200).json({
      company: {
        id: updatedCompany._id,
        username: updatedCompany.username,
        companyName: updatedCompany.companyName,
        password: updatedCompany.password,
        email: updatedCompany.email,
        province: updatedCompany.province,
        cityMunicipality: updatedCompany.cityMunicipality,
        organizationType: updatedCompany.organizationType,
      },
      token: updatedCompany.token,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.userId);
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = {
  fetchCompany,
  fetchCompanies,
  updateCompany,
  deleteCompany,
};
