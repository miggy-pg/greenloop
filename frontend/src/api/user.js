import axios from "redaxios";
import { getEndpoint } from "../utils/Helper";

export const fetchUser = async (userId) => {
  return axios.get(`${getEndpoint}/v1/users/${userId}`);
};

export const fetchUsers = async () => {
  return axios.get(`${getEndpoint}/v1/users`);
};

export const updateUser = async (userId, user) => {
  return axios.put(`${getEndpoint}/v1/users/${userId}`, user);
};

export const createUser = async (user) => {
  return axios.post(`${getEndpoint}/v1/sign-up`, user);
};

export const deleteUser = async (userId) => {
  return axios.delete(`${getEndpoint}/v1/users/${userId}`);
};

export const signOutUser = async (userId) => {
  return axios.patch(`${getEndpoint}/v1/sign-out/${userId}`);
};
