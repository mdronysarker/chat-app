import { createSlice } from "@reduxjs/toolkit";

export const activeChatSlice = createSlice({
  name: "single",
  initialState: {
    active: localStorage.getItem("singles")
      ? JSON.parse(localStorage.getItem("singles"))
      : null,
  },

  reducers: {
    activeChat: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { activeChat } = activeChatSlice.actions;
export default activeChatSlice.reducer;
