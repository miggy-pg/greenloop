import axios from "redaxios";
import { getEndpoint } from "../utils/Helper";

export const getMessages = async (conversationId, companyId, receiverId) => {
  return axios.get(
    `${getEndpoint}/v1/messages/${conversationId}?senderId=${companyId}&&receiverId=${receiverId}`
  );
};

export const getConversations = async (companyId) => {
  return axios.get(`${getEndpoint}/v1/conversations/${companyId}`);
};

export const createConversation = async (senderId, receiverId) => {
  return axios.post(`${getEndpoint}/v1/conversations`, {
    senderId,
    receiverId,
  });
};
