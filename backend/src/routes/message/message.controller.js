const Conversations = require("../../models/conversation.model");
const Message = require("../../models/message.model");
const Users = require("../../models/user.model");
const cloudinaryUploader = require("../../utils/cloudinary/cloudinaryUploader");

exports.message = async (req, res) => {
  try {
    const {
      conversationId,
      senderId,
      message,
      image,
      receiverId = "",
    } = req.body;

    if (!senderId || !message || (!conversationId && !receiverId))
      return res.status(400).send("Please fill all required fields");

    const { imageUrl, public_id } = await cloudinaryUploader(
      image,
      process.env.MESSAGE_IMAGE_FOLDER,
      process.env.MESSAGE_IMAGE_SIZE,
      process.env.RESIZE_TYPE
    );
    if (conversationId === "new" && receiverId) {
      const newCoversation = new Conversations({
        members: [senderId, receiverId],
      });
      await newCoversation.save();

      const newMessage = new Message({
        conversationId: newCoversation._id,
        senderId,
        message,
        image: {
          public_id: public_id,
          url: imageUrl,
        },
      });

      await newMessage.save();
      return res.status(200).send("Message sent successfully");
    }
    const newMessage = new Message({
      conversationId,
      senderId,
      message,
      image: {
        public_id: public_id,
        url: imageUrl,
      },
    });

    await newMessage.save();
    res.status(200).send("Message sent successfully");
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Something went wrong");
  }
};

exports.conversationMessage = async (req, res) => {
  try {
    const checkMessage = async (conversationId) => {
      const messages = await Message.find({ conversationId });
      const messageUserData = Promise.all(
        messages.map(async (message) => {
          const user = await Users.findById(message.senderId);
          return {
            user: {
              id: user._id,
              email: user.email,
              companyName: user.companyName,
              image: user.image,
            },
            hasRead: message.hasRead,
            message: {
              id: message._id,
              msg: message.message,
              msgImage: message?.image,
            },
            conversationId: conversationId,
          };
        })
      );
      res.status(200).json(await messageUserData);
    };

    const conversationId = req.params.conversationId;

    if (conversationId === "new") {
      const checkConversation = await Conversations.findOne({
        members: { $all: [req.query.senderId, req.query.receiverId] },
      });

      if (checkConversation?.length > 0) {
        checkMessage(checkConversation[0]._id);
      }
    } else {
      checkMessage(conversationId);
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

exports.hasReadMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    await Message.updateOne(
      { _id: messageId },
      {
        $set: { hasRead: true },
      }
    );
    res.status(200).send("Message has been marked as read");
  } catch (err) {
    console.log("Error: ", err);
  }
};
