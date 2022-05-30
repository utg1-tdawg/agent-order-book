import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  id: null,
  name: null,
  licenseNum: null,
  contactNum: null,
  isVerified: null,
};

const userPageSlice = createSlice({
  name: "userPage",
  initialState: INITIAL_STATE,
  reducers: {
    storeUserData(state, action) {
      return action.payload;
    },
    resetUserPage(state, action) {
      return INITIAL_STATE;
    },
  },
});

const { storeUserData, resetUserPage } = userPageSlice.actions;
export { storeUserData, resetUserPage };

export default userPageSlice.reducer;
