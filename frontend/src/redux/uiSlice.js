import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});
