import axios from "axios";

export const fetchUser = async (userId) => {
  return await axios.get(`http://localhost:8000/api/users/${userId}`);
};

export const uploadPost = async (post) => {
  return axios.post("http://localhost:8000/post/new", post);
};

export const updateProfile = async (userId, user) => {
  return axios.put(`http://localhost:8000/api/users/${userId}`, user);
};
