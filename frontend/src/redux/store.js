import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { uiSlice } from "./uiSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    // listings: listingsSlice,
  },
});
