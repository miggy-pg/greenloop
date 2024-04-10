import axios from "redaxios";
import { getEndpoint } from "../utils/Helper";

export const signInUser = async (userData) => {
  return await axios.post(`${getEndpoint}/v1/sign-in`, userData);
};

export const signUpUser = async (userData) => {
  console.log("signUpUser: ", userData);
  return await axios.post(`${getEndpoint}/v1/sign-up`, userData);
};
