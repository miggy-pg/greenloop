import axios from "axios";

export const signInUser = async (userSignIn) => {
  return await axios.post("http://localhost:8000/api/sign-in", userSignIn);
};

export const signUpUser = async (userSignUp) => {
  return await axios.post("http://localhost:8000/api/sign-up", userSignUp);
};
