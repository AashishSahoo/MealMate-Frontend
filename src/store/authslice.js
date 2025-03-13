import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    email: null,
  },
  reducers: {
    // <-- Corrected property name
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout: (state) => {
      // Adjusted the logout function to clear state
      state.user = null;
      state.token = null;
      state.email = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
