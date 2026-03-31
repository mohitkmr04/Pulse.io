import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null
  },
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },

    logout: (state) => {
      state.token = null;
      state.role = null;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;