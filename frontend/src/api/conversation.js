import axios from "axios";

export const getMessages = async (conversationId, userId, receiverId) => {
  return axios.get(
    `http://localhost:8000/api/message/${conversationId}?senderId=${userId}&&receiverId=${receiverId}`
  );
};

export const getConversations = async (userId) => {
  return axios.get(`http://localhost:8000/api/conversations/${userId}`);
};
