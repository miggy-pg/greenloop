import axios from "axios";

export const signInUser = async (userData) => {
  return await axios.post("http://localhost:8000/api/sign-in", userData);
};

export const signUpUser = async (userData) => {
  return await axios.post("http://localhost:8000/api/sign-up", userData);
};
