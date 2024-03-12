import axios from "axios";
import { getEndpoint } from "../utils/Helper";

export const fetchWastes = async () => {
  return await axios.get(`${getEndpoint}/api/wastes`);
};

export const deleteWaste = async (wasteId) => {
  return await axios.delete(`${getEndpoint}/api/wastes/${wasteId}`);
};
