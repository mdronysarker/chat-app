import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slice/LoginSlice";
import activeSlice from "../Slice/activeSingleSlice";

const store = configureStore({
  reducer: {
    login: authSlice,
    active: activeSlice,
  },
});

export default store;
