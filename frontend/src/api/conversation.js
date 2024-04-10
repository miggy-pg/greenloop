import axios from "redaxios";
import { getEndpoint } from "../utils/Helper";

export const getMessages = async (conversationId, userId, receiverId) => {
  return axios.get(
    `${getEndpoint}/v1/messages/${conversationId}?senderId=${userId}&&receiverId=${receiverId}`
  );
};

export const getConversations = async (userId) => {
  return axios.get(`${getEndpoint}/v1/conversations/${userId}`);
};

export const createConversation = async (senderId, receiverId) => {
  return axios.post(`${getEndpoint}/v1/conversations`, {
    senderId,
    receiverId,
  });
};
