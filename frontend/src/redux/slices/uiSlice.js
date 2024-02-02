import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hideModals: false,
  messages: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setHideModals: (state, action) => {
      state.hideModals = action.payload;
    },
    setMessages: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setHideModals, setMessages } = uiSlice.actions;

export default uiSlice.reducer;
