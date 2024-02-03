import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: {},
  receiverid: "",
  messages: [],
  conversations: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      console.log("setMesages: ", action.payload);
      state.messages.push(action.payload);
    },
    setConversations: (state, action) => {
      console.log("action.payload: ", action.payload);
      state.conversations.push(action.payload);
    },
    successLogin: (state, action) => {
      state.user = action.payload;
    },
    errorLoginUser: (state, action) => {
      toast.error(action.payload);
    },
    logoutUser: () => {
      localStorage.removeItem("user:token");
    },
    successUpdateUser: () => {
      toast.success("User has been updated successfully!");
    },
    errorUpdateUser: (state, action) => {
      toast.error(action.payload);
    },
    successDeleteListing: () => {
      toast.success("User has been deleted!");
    },
    errorDeleteListing: (state, action) => {
      toast.error(action.payload);
    },
    successCreateAccount: () => {
      toast.success("You have successfully created the user!");
    },
    errorCreateAccount: (state, action) => {
      toast.error(action.payload);
    },
  },
});

export const {
  setMessages,
  setConversations,
  successLogin,
  errorLoginUser,
  logoutUser,
  successUpdateUser,
  errorUpdateUser,
  successDeleteListing,
  errorDeleteListing,
  successCreateAccount,
  errorCreateAccount,
} = userSlice.actions;

export default userSlice.reducer;
