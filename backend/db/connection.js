const mongoose = require("mongoose");

// PORT + DB Name
const url = `mongodb://localhost:27017/greenloop`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log("Error", e));
