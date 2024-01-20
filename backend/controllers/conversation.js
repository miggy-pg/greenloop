const Conversations = require("../models/Conversations");
const Users = require("../models/Users");

/**
 *
 * @returns {Conversations} object with members: [senderId, receiverId]
 *
 * NOTE: This function is not used for this project
 */
exports.conversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const conversations = await Conversations.find({
      members: { $in: [receiverId] },
    });
    console.log("creatingConversation: ", conversations);
    console.log("creatingConversationReceiverId: ", receiverId);
    console.log("creatingConversationSenderId: ", senderId);
    if (!conversations.length) {
      const newCoversation = new Conversations({
        members: [senderId, receiverId],
      });
      await newCoversation.save();
      res.status(200).send("Conversation created successfully");
    }
  } catch (error) {
    console.log(error, "Error");
  }
};

/**
 * Generate conversation between sender and receiver without selecting a user
 *
 * @param {receivedId} request query sent to url directly without form
 * @returns {any}
 */
exports.userConversations = async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversations.find({
      members: { $in: [userId] },
    });
    console.log("userId", userId);
    console.log("conversationsIn Converastion", conversations);
    const conversationUserData = Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.members.find(
          (member) => member !== userId
        );
        const user = await Users.findById(receiverId);
        console.log("receivedId: ", receiverId);
        console.log("user", user);
        return {
          user: {
            receiverId: user._id,
            email: user.email,
            companyName: user.companyName,
            image: user.image,
          },
          conversationId: conversation._id,
        };
      })
    );
    res.status(200).json(await conversationUserData);
  } catch (error) {
    console.log(error, "Error");
  }
};
