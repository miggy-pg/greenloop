import axios from "redaxios";
import { getEndpoint } from "../utils/Helper";

export const fetchUser = async (companyId) => {
  return axios.get(`${getEndpoint}/v1/users/${companyId}`);
};

export const fetchUsers = async () => {
  return axios.get(`${getEndpoint}/v1/users`);
};

export const updateUser = async (companyId, user) => {
  return axios.put(`${getEndpoint}/v1/users/${companyId}`, user);
};

export const createUser = async (user) => {
  return axios.post(`${getEndpoint}/v1/sign-up`, user);
};

export const deleteUser = async (companyId) => {
  return axios.delete(`${getEndpoint}/v1/users/${companyId}`);
};

export const signOutCompany = async (companyId) => {
  return axios.patch(`${getEndpoint}/v1/sign-out/${companyId}`);
};
