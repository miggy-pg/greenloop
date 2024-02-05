import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: {},
  receiverid: "",
  messages: [],
  conversations: [],
  wastes: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages.push(action.payload);
    },
    setConversations: (state, action) => {
      state.conversations.push(action.payload);
    },
    setWastes: (state, action) => {
      state.wastes.push(action.payload);
    },
    successLogin: (state, action) => {
      state.user = action.payload;
    },
    errorLoginUser: (state, action) => {
      toast.error(action.payload);
    },
    signOutUser: () => {
      localStorage.removeItem("user:token");
      localStorage.removeItem("user:detail");
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
  setWastes,
  successLogin,
  errorLoginUser,
  signOutUser,
  successUpdateUser,
  errorUpdateUser,
  successDeleteListing,
  errorDeleteListing,
  successCreateAccount,
  errorCreateAccount,
} = userSlice.actions;

export default userSlice.reducer;
