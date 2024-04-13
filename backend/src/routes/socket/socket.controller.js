const io = require("socket.io")(process.env.SOCKET_PORT, {
  cors: {
    origin: "*",
  },
});
const Company = require("../../models/company.model");
const Conversations = require("../../models/conversation.model");
const { checkMessages } = require("../../utils/checkMessages");

let companies = [];
io.on("connection", (socket) => {
  console.log("Company connected", socket.id);
  socket.on("addCompany", (companyId) => {
    const isCompanyExist = companies.find(
      (company) => company.companyId === companyId
    );
    if (!isCompanyExist) {
      const company = { companyId, socketId: socket.id };
      companies.push(company);
      io.emit("getCompanies", companies);
    }
  });

  socket.on(
    "sendMessage",
    async ({ senderId, receiverId, message, conversationId }) => {
      const receiverCompany = companies.find(
        (company) => company.companyId === receiverId
      );
      const senderCompany = companies.find(
        (company) => company.companyId === senderId
      );
      const company = await Company.findById(senderId);
      if (receiverCompany) {
        io.to(receiver.socketId)
          .to(sender.socketId)
          .emit("getMessage", {
            senderId,
            message,
            conversationId,
            receiverId,
            company: {
              id: company._id,
              fullName: company.fullName,
              email: company.email,
            },
          });
      } else {
        io.to(senderCompany.socketId).emit("getMessage", {
          senderId,
          message,
          conversationId,
          receiverId,
          company: {
            id: company._id,
            fullName: company.fullName,
            email: company.email,
          },
        });
      }
    }
  );

  socket.on("getNewMessages", async (companyId) => {
    const checkConversation = await Conversations.find({
      members: { $in: [companyId] },
    });

    if (checkConversation.length > 0) {
      const messages = await checkMessages(checkConversation[0]._id);
      const newMessages = messages.filter(
        (message) =>
          !message.hasRead && message.user.id.toString() !== companyId
      );
      io.to(socket.id).emit("getNewMessages", newMessages);
    }
  });

  socket.on("disconnect", () => {
    companies = companies.filter((company) => user.socketId !== socket.id);
    io.emit("getCompanies", companies);
  });
});
