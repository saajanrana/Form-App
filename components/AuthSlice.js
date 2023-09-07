// authSlice.js
import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
  name: "auth",
  initialState:{
    isLoggedIn:false,
    loginError:'',
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
    },
    loginUser: (state, action) => {
      if (
        state.user &&
        state.user.email === action.payload.email &&
        state.user.password === action.payload.password
      ) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
        state.loginError = "Incorrect Email or password"; // Set an error message
      }
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
