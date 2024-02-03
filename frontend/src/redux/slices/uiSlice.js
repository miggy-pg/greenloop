import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hideModals: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setHideModals: (state, action) => {
      state.hideModals = action.payload;
    },
  },
});

export const { setHideModals } = uiSlice.actions;

export default uiSlice.reducer;
