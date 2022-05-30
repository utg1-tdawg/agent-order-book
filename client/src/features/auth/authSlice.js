import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: null,
    userId: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload;
    },
    logOut(state, action) {
      state.isLoggedIn = null;
      state.userId = null;
    },
  },
});

const { logIn, logOut } = authSlice.actions;
const reducer = authSlice.reducer;

export { logIn, logOut };
export default reducer;
