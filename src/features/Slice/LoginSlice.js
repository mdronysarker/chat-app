import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Login",
  initialState: {
    loggedIn: null,
  },
  reducers: {
    LoginUser: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { LoginUser } = userSlice.actions;
export default userSlice.reducer;
