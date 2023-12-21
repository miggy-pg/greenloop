const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const multer = require("multer");
const path = require("path");

// Connect DB
require("./db/connection");

// Import Files
const Users = require("./models/Users");
const Conversations = require("./models/Conversations");
const Messages = require("./models/Messages");
const Waste = require("./models/Waste");

// app Use
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 8000;

// Socket.io
let users = [];
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.on("addUser", (userId) => {
    const isUserExist = users.find((user) => user.userId === userId);
    if (!isUserExist) {
      const user = { userId, socketId: socket.id };
      users.push(user);
      io.emit("getUsers", users);
    }
  });

  socket.on(
    "sendMessage",
    async ({ senderId, receiverId, message, conversationId }) => {
      const receiver = users.find((user) => user.userId === receiverId);
      const sender = users.find((user) => user.userId === senderId);
      const user = await Users.findById(senderId);
      console.log("sender :>> ", sender, receiver);
      if (receiver) {
        io.to(receiver.socketId)
          .to(sender.socketId)
          .emit("getMessage", {
            senderId,
            message,
            conversationId,
            receiverId,
            user: { id: user._id, fullName: user.fullName, email: user.email },
          });
      } else {
        io.to(sender.socketId).emit("getMessage", {
          senderId,
          message,
          conversationId,
          receiverId,
          user: { id: user._id, fullName: user.fullName, email: user.email },
        });
      }
    }
  );

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
  // io.emit('getUsers', socket.userId);
});

// Routes
app.get("/", (req, res) => {
  res.send("Welcome");
});

// ------------------------ USER ROUTES --------------------------------
// REGISTER COMPANY/USER
app.post("/api/sign-up", async (req, res, next) => {
  console.log("Register in progress");

  try {
    const {
      companyName,
      email,
      username,
      password,
      confirmPassword,
      organizationType,
      province,
      cityMunicipality,
      token,
    } = req.body;

    if (password !== confirmPassword) {
      res.status(400).send("Password does not match");
    }

    if (!username || !email || !password) {
      res.status(400).send("Please fill all required fields");
    } else {
      const userNameExist = await Users.findOne({ username });
      const emailExist = await Users.findOne({ email });
      if (userNameExist || emailExist) {
        res
          .status(400)
          .send(`${userNameExist ? "Username " : "Email "}already exists`);
      } else {
        const newUser = new Users({
          companyName,
          email,
          username,
          password,
          organizationType,
          province,
          cityMunicipality,
          token,
        });

        bcryptjs.hash(password, 10, (err, hashedPassword) => {
          newUser.set("password", hashedPassword);
          newUser.save();
          next();
        });
        return res.status(200).send("Company registered successfully");
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});

// LOGIN COMPANY/USER
app.post("/api/sign-in", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(400)
        .send(`Please fill ${!username ? "username" : "password"}}`);
    } else {
      const user = await Users.findOne({ username });
      if (!user) {
        res.status(400).send("Username or password is incorrect");
      } else {
        const validateUser = await bcryptjs.compare(password, user.password);
        if (!validateUser) {
          res.status(400).send("Username or password is incorrect");
        } else {
          const payload = {
            userId: user._id,
            email: user.email,
          };
          const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY";

          jwt.sign(
            payload,
            JWT_SECRET_KEY,
            { expiresIn: 84600 },
            async (err, token) => {
              await Users.updateOne(
                { _id: user._id },
                {
                  $set: { token },
                }
              );
              user.save();
              return res.status(200).json({
                user: {
                  id: user._id,
                  username: user.username,
                  companyName: user.companyName,
                  province: user.province,
                  cityMunicipality: user.cityMunicipality,
                },
                token: token,
              });
            }
          );
        }
      }
    }
  } catch (error) {
    console.log(error, "Error");
  }
});

// ------------------------ END OF USER ROUTES --------------------------------

// ------------------------ LISTING ROUTES --------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/waste");
  },
  filename: function (req, file, cb) {
    console.log("file: ", file);
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

app.post("/post/new", upload.single("image"), async (req, res) => {
  try {
    const { post, wasteCategory, user } = req.body;
    const image = req.file ? req.file.filename : "";

    const newWaste = await Waste.create({ post, wasteCategory, image, user });
    res.json(newWaste);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/getWaste", async (req, res) => {
  try {
    const waste = await Waste.find();
    res.json(waste);
  } catch (error) {
    console.log(error, "Error");
  }
});

// ------------------------ CHAT ROUTES --------------------------------

app.post("/api/conversation", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newCoversation = new Conversations({
      members: [senderId, receiverId],
    });
    await newCoversation.save();
    res.status(200).send("Conversation created successfully");
  } catch (error) {
    console.log(error, "Error");
  }
});

app.get("/api/conversations/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversations.find({
      members: { $in: [userId] },
    });
    const conversationUserData = Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.members.find(
          (member) => member !== userId
        );
        const user = await Users.findById(receiverId);
        return {
          user: {
            receiverId: user._id,
            email: user.email,
            fullName: user.fullName,
          },
          conversationId: conversation._id,
        };
      })
    );
    res.status(200).json(await conversationUserData);
  } catch (error) {
    console.log(error, "Error");
  }
});

app.post("/api/message", async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId = "" } = req.body;
    if (!senderId || !message)
      return res.status(400).send("Please fill all required fields");
    if (conversationId === "new" && receiverId) {
      const newCoversation = new Conversations({
        members: [senderId, receiverId],
      });
      await newCoversation.save();
      const newMessage = new Messages({
        conversationId: newCoversation._id,
        senderId,
        message,
      });
      await newMessage.save();
      return res.status(200).send("Message sent successfully");
    } else if (!conversationId && !receiverId) {
      return res.status(400).send("Please fill all required fields");
    }
    const newMessage = new Messages({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.log(error, "Error");
  }
});

app.get("/api/message/:conversationId", async (req, res) => {
  try {
    const checkMessages = async (conversationId) => {
      console.log(conversationId, "conversationId");
      const messages = await Messages.find({ conversationId });
      const messageUserData = Promise.all(
        messages.map(async (message) => {
          const user = await Users.findById(message.senderId);
          return {
            user: { id: user._id, email: user.email, fullName: user.fullName },
            message: message.message,
          };
        })
      );
      res.status(200).json(await messageUserData);
    };
    const conversationId = req.params.conversationId;
    if (conversationId === "new") {
      const checkConversation = await Conversations.find({
        members: { $all: [req.query.senderId, req.query.receiverId] },
      });
      if (checkConversation.length > 0) {
        checkMessages(checkConversation[0]._id);
      } else {
        return res.status(200).json([]);
      }
    } else {
      checkMessages(conversationId);
    }
  } catch (error) {
    console.log("Error", error);
  }
});

// ------------------------ END OF CHAT ROUTES --------------------------------

// GET USER
app.get("/api/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await Users.find({ _id: { $ne: userId } });
    const listing = await Waste.find({ user: userId });
    const usersData = Promise.all(
      users.map(async (user) => {
        return {
          user: {
            email: user.email,
            username: user.username,
            password: user.password,
            companyName: user.companyName,
            receiverId: user._id,
            organizationType: user.organizationType,
            province: user.province,
            cityMunicipality: user.cityMunicipality,
          },
        };
      })
    );

    res.status(200).json(await usersData);
  } catch (error) {
    console.log("Error", error);
  }
});

// GET WASTE FROM USER
app.get("/api/wastes/:userId", async (req, res) => {
  try {
    const { userId } = req.body;
    const listing = await Waste.find({ user: userId });
    const wasteData = Promise.all(
      listing.map(async (waste) => {
        return {
          waste: {
            post: waste.post,
            wasteCategory: waste.wasteCategory,
            image: waste.image,
            user: waste.user,
          },
        };
      })
    );

    res.status(200).json(await usersData);
  } catch (error) {
    console.log("Error", error);
  }
});

// UPDATE USER PROFILE
app.put("/api/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId: ", userId);
    const {
      companyName,
      email,
      username,
      password,
      organizationType,
      province,
      cityMunicipality,
    } = req.body;

    const user = await Users.findById(userId);
    if (user) {
      user.companyName = companyName;
      user.email = email;
      user.username = username;
      user.password = password;
      user.organizationType = organizationType;
      user.province = province;
      user.cityMunicipality = cityMunicipality;
    }

    const updatedUser = await user.save();
    console.log("updatedUser: ", updatedUser);

    res.status(200).json({
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        companyName: updatedUser.companyName,
        password: updatedUser.password,
        email: updatedUser.email,
        province: updatedUser.province,
        cityMunicipality: updatedUser.cityMunicipality,
        organizationType: updatedUser.organizationType,
      },
      token: updatedUser.token,
    });
  } catch (error) {
    console.log("Error", error);
  }
});

// GET WASTE
app.get("/api/wastes", async (req, res) => {
  try {
    const listing = await Waste.find({});
    const wasteData = Promise.all(
      listing.map(async (waste) => {
        return {
          waste: {
            post: waste.post,
            wasteCategory: waste.wasteCategory,
            image: waste.image,
            user: waste.user,
            createdAt: waste.createdAt,
          },
        };
      })
    );

    res.status(200).json(await wasteData);
  } catch (error) {
    console.log("Error", error);
  }
});

app.listen(port, () => {
  console.log("listening on port " + port);
});

const waste = path.join(__dirname, "images", "waste");
app.use("/images/waste", express.static(waste)); // for serving static files
