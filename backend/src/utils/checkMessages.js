const Messages = require("../models/message.model");
const Company = require("../models/company.model");

exports.checkMessages = async (conversationId) => {
  const messages = await Messages.find({ conversationId });
  const companyMessages = Promise.all(
    messages.map(async (message) => {
      const company = await Company.findById(message.senderId);
      return {
        company: {
          id: company?._id,
          email: company?.email,
          companyName: company?.companyName,
          image: company?.image,
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
  return companyMessages;
};
