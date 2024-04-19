const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please add a company name"],
    maxlength: 40,
  },
  username: {
    type: String,
    required: [true, "Please add a username"],
    unique: true,
    minlength: 8,
    maxlength: 40,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: /^\S+@\S+\.\S+$/,
    maxlength: 100,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 8,
    maxlength: 300,
  },
  organizationType: {
    type: String,
    maxlength: 50,
  },
  cityMunicipality: {
    type: String,
    maxlength: 50,
  },
  province: {
    type: String,
    maxlength: 50,
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    maxlength: 500,
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
