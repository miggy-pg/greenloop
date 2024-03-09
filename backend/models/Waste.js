const mongoose = require("mongoose");

const wasteSCheme = mongoose.Schema(
  {
    post: {
      type: String,
      required: true,
      maxLength: 200,
    },
    wasteCategory: {
      type: String,
      required: true,
      maxLength: 40,
    },
    image: {
      required: true,
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Waste = mongoose.model("Waste", wasteSCheme);

module.exports = Waste;
