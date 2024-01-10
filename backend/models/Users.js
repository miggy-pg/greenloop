const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  username: {
    type: String,
    required: true,
    maxLength: 40,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
    maxLength: 100,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 300,
  },
  organizationType: {
    type: String,
    maxLength: 50,
  },
  cityMunicipality: {
    type: String,
    maxLength: 50,
  },
  province: {
    type: String,
    maxLength: 50,
  },
  image: {
    type: String,
    maxLength: 250,
  },
  token: {
    type: String,
    maxLength: 500,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
