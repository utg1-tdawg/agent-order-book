import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import userPageSlice from "../features/userPage/userPageSlice";
import listingsSlice from "../features/listings/listingsSlice";
import pendingBidsSlice from "../features/pendingBids/pendingBidsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    userPage: userPageSlice,
    listings: listingsSlice,
    pendingBids: pendingBidsSlice,
  },
});

export default store;
