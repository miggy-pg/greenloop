import axios from "axios";

export const sendUserMessage = async (newMessage) => {
  return axios.post("http://localhost:8000/api/message", newMessage);
};
