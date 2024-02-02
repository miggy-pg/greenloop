import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import uiSlice from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    ui: uiSlice,
    // listings: listingsSlice,
  },
});

export default store;
