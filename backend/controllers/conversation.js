const Conversations = require("../models/Conversations");
const Users = require("../models/Users");

/**
 *
 * @returns {Conversations} object with members: [senderId, receiverId]
 */
exports.conversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    let conversations = await Conversations.find({
      $or: [
        { members: { $eq: [senderId, receiverId] } },
        { members: { $eq: [receiverId, senderId] } },
      ],
    });
    if (!conversations.length) {
      const conversations = new Conversations({
        members: [senderId, receiverId],
      });
      await conversations.save();
      console.log("conversationsCreating", conversations);
      res.status(200).json(conversations);
    }
    console.log("conversationsGetting", conversations);
    res.status(200).json(conversations);
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
