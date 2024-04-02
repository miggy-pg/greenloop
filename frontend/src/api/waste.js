import axios from "redaxios";
import { getEndpoint } from "../utils/Helper";

export const fetchWastes = async () => {
  return await axios.get(`${getEndpoint}/api/wastes`);
};

export const uploadPost = async (payload) => {
  return axios.post(`${getEndpoint}/api/wastes`, payload);
};

export const updateWaste = async (wasteId, payload) => {
  return await axios.put(`${getEndpoint}/api/wastes/${wasteId}`, payload);
};

export const updateWasteAvailableOrNot = async (wasteId, payload) => {
  return await axios.put(
    `${getEndpoint}/api/wastes/${wasteId}/availability`,
    payload
  );
};

export const deleteWaste = async (wasteId) => {
  return await axios.delete(`${getEndpoint}/api/wastes/${wasteId}`);
};
