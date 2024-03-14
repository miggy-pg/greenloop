const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Connect DB
require("./db/connection");

const app = express();
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: false }));

const prodOrigin = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const devOrigin = ["http://localhost:5173"];
const allowedOrigins =
  process.env.NODE_ENV === "production" ? prodOrigin : devOrigin;

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        console.log(origin, allowedOrigins);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const port = process.env.PORT || 8000;

require("./controllers/socket");

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/waste"));
app.use("/api", require("./routes/conversation"));
app.use("/api", require("./routes/message"));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
