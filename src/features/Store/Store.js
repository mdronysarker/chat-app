import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slice/LoginSlice";

const store = configureStore({
  reducer: {
    login: authSlice,
  },
});

export default store;
