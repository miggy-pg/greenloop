import axios from "axios";

export const sendUserMessage = async (newMessage) => {
  console.log("newMessage: ", newMessage);
  return axios.post("http://localhost:8000/api/message", newMessage);
};

export const updateHasReadMessage = async (messageId) => {
  return axios.get(`http://localhost:8000/api/message/${messageId}`);
};
