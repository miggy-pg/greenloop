import axios from "redaxios";
import { getEndpoint } from "../utils/Helper";

export const signInUser = async (userData) => {
  console.log("userData: ", userData);
  console.log(
    "signIn: ",
    await axios.post(`${getEndpoint}/v1/sign-in`, userData)
  );
  return await axios.post(`${getEndpoint}/v1/sign-in`, userData);
};

export const signUpUser = async (userData) => {
  console.log("signUpUser: ", userData);
  console.log(
    "signUp: ",
    await axios.post(`${getEndpoint}/v1/sign-up`, userData)
  );
  return await axios.post(`${getEndpoint}/v1/sign-up`, userData);
};
