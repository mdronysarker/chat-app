import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slice/LoginSlice";
import activeChatSlice from "../Slice/activeSingleSlice";

const store = configureStore({
  reducer: {
    login: authSlice,
    active: activeChatSlice,
  },
});

export default store;
