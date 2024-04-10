import axios from "redaxios";
import { getEndpoint } from "../utils/Helper";

export const fetchWastes = async () => {
  return await axios.get(`${getEndpoint}/v1/wastes`);
};

export const uploadPost = async (payload) => {
  return axios.post(`${getEndpoint}/v1/wastes`, payload);
};

export const updateWaste = async (wasteId, payload) => {
  return await axios.put(`${getEndpoint}/v1/wastes/${wasteId}`, payload);
};

export const updateWasteAvailableOrNot = async (wasteId, payload) => {
  return await axios.put(
    `${getEndpoint}/v1/wastes/${wasteId}/availability`,
    payload
  );
};

export const deleteWaste = async (wasteId) => {
  return await axios.delete(`${getEndpoint}/v1/wastes/${wasteId}`);
};
