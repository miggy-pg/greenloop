const Message = require("../../models/message.model");
const Conversations = require("../../models/conversation.model");
const Users = require("../../models/user.model");
const cloudinaryUploader = require("../../utils/cloudinary/cloudinnaryUploader");

exports.message = async (req, res) => {
  try {
    const {
      conversationId,
      senderId,
      message,
      image,
      receiverId = "",
    } = req.body;

    if (!senderId || !message)
      return res.status(400).send("Please fill all required fields");

    const { imageUrl, public_id } = await cloudinaryUploader(
      image,
      "conversations/messages",
      300,
      "scale"
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
      return res.status(201).send("Message sent successfully");
    } else if (!conversationId && !receiverId) {
      return res.status(400).send("Please fill all required fields");
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
    // if (image?.length) {
    //   newMessage.image = {
    //     public_id: wasteImage.public_id,
    //     url: wasteImage.secure_url,
    //   };
    // }
    await newMessage.save();
    res.status(201).send("Message sent successfully");
  } catch (error) {
    console.log(error, "Error");
  }
};

exports.conversationMessage = async (req, res) => {
  try {
    const checkMessage = async (conversationId) => {
      const messages = await Message.find({ conversationId });
      // console.log("messagesconversationId: ", conversationId);
      const messageUserData = Promise.all(
        messages.map(async (message) => {
          const user = await Users.findById(message.senderId);
          // console.log("userConversationMessage: ", message);
          // console.log("messageConversationMessage: ", message);
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
      // console.log("messageUserData: ", await messageUserData);
      res.status(200).json(await messageUserData);
    };

    const conversationId = req.params.conversationId;

    if (conversationId === "new") {
      const checkConversation = await Conversations.find({
        members: { $all: [req.query.senderId, req.query.receiverId] },
      });
      if (checkConversation.length > 0) {
        checkMessage(checkConversation[0]._id);
      } else {
        return res.status(200).json([]);
      }
    } else {
      checkMessage(conversationId);
    }
  } catch (error) {
    console.log("Error", error);
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
  } catch (error) {
    console.log("Error", error);
  }
};
