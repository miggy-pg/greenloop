const express = require("express");
const cors = require("cors");
const io = require("socket.io")(8080, {
  cors: {
    origin: "*",
  },
});
const multer = require("multer");
const path = require("path");

// Connect DB
require("./db/connection");

// Import Files
const Users = require("./models/Users");
const {
  fetchUser,
  fetchUserWaste,
  updateProfile,
  fetchUsers,
  deleteUser,
} = require("./controllers/user");
const { registerUser, loginUser, signOutUser } = require("./controllers/auth");
const {
  conversation,
  userConversations,
} = require("./controllers/conversation");
const {
  message,
  conversationMessage,
  hasReadMessage,
} = require("./controllers/message");
const {
  fetchWastes,
  postWasteImage,
  fetchWaste,
} = require("./controllers/waste");

// app Use
const app = express();
app.use(
  express.json({
    limit: "50mb",
  })
);
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
      console.log("sender: ", sender);
      const user = await Users.findById(senderId);
      console.log("sender :>> ", sender, receiver);
      console.log("messageSocket: ", message);
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
app.post("/api/sign-up", registerUser);

// LOGIN COMPANY/USER
app.post("/api/sign-in", loginUser);

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

app.post("/post/new", upload.single("image"), postWasteImage);

app.get("/getWaste", fetchWaste);

// ------------------------ CHAT ROUTES --------------------------------

app.post("/api/conversation", conversation);

app.get("/api/conversations/:userId", userConversations);

app.post("/api/message", message);

app.get("/api/message/:conversationId", conversationMessage);

app.patch("/api/message/:messageId", hasReadMessage);

// ------------------------ END OF CHAT ROUTES --------------------------------

// GET USER
app.get("/api/users/:userId", fetchUser);

// GET ALL USERS
app.get("/api/users", fetchUsers);

// DELETE USER
app.delete("/api/users/:userId", deleteUser);

// GET WASTE FROM USER
app.get("/api/wastes/:userId", fetchUserWaste);

// UPDATE USER PROFILE
app.post("/api/users/:userId", updateProfile);

// GET WASTE
app.get("/api/wastes", fetchWastes);

// SIGN OUT USER
app.patch("/users/sign-out/:userId", signOutUser);

app.listen(port, () => {
  console.log("listening on port " + port);
});

const waste = path.join(__dirname, "images", "waste");
app.use("/images/waste", express.static(waste)); // for serving static files
