const Messages = require("../models/Messages");
const Conversations = require("../models/Conversations");
const Users = require("../models/Users");
const Cloudinary = require("../utils/cloudinary");

exports.message = async (req, res) => {
  try {
    const {
      conversationId,
      senderId,
      message,
      image,
      receiverId = "",
    } = req.body;

    let result = null;
    if (image?.length > 0) {
      result = await Cloudinary.uploader.upload(image, {
        folder: "conversations/messages",
        width: 300,
        crop: "scale",
      });
    }

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
      if (image?.length) {
        newMessage.image = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }

      await newMessage.save();
      return res.status(200).send("Message sent successfully");
    } else if (!conversationId && !receiverId) {
      return res.status(400).send("Please fill all required fields");
    }
    const newMessage = new Messages({
      conversationId,
      senderId,
      message,
    });
    if (image?.length) {
      newMessage.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    await newMessage.save();
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.log(error, "Error");
  }
};

exports.conversationMessage = async (req, res) => {
  try {
    const checkMessages = async (conversationId) => {
      const messages = await Messages.find({ conversationId });
      console.log("messagesConversationMessage: ", messages);
      console.log("messagesconversationId: ", conversationId);
      const messageUserData = Promise.all(
        messages.map(async (message) => {
          const user = await Users.findById(message.senderId);
          console.log("userConversationMessage: ", user);
          console.log("messageConversationMessage: ", message);
          return {
            user: {
              id: user._id,
              email: user.email,
              companyName: user.companyName,
              image: user.image,
            },
            hasRead: message.hasRead,
            message: { msg: message.message, msgImage: message?.image },
          };
        })
      );
      res.status(200).json(await messageUserData);
    };
    const conversationId = req.params.conversationId;
    console.log("");
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
};
