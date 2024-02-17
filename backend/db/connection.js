const mongoose = require("mongoose");

// PORT + DB Name
const url = `mongodb+srv://waste-system-user:6iftdonD4dLIQuZp@cluster0.069wmwt.mongodb.net/`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log("Error", e));
