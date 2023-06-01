import { createSlice } from "@reduxjs/toolkit";

export const ActiveSingleSlice = createSlice({
  name: "single",
  initialState: {
    active: "mern 2202",
  },

  reducers: {
    Activesingle: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { Activesingle } = ActiveSingleSlice.actions;
export default ActiveSingleSlice.reducer;
