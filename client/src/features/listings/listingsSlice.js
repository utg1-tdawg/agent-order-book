import { createSlice } from "@reduxjs/toolkit";
import server from "../../apis/server";

const INITIAL_STATE = {
  createBidListingId: null,
  fetchedListings: [],
};

const listingsSlice = createSlice({
  name: "listings",
  initialState: INITIAL_STATE,
  reducers: {
    storeCreateBidListingId(state, action) {
      state.createBidListingId = action.payload;
    },
    storeFetchedListings(state, action) {
      state.fetchedListings = action.payload;
    },
    resetListings() {
      return INITIAL_STATE;
    },
  },
});

const { storeCreateBidListingId, storeFetchedListings, resetListings } =
  listingsSlice.actions;
export { storeCreateBidListingId, resetListings };
export default listingsSlice.reducer;

export function fetchListings(userId) {
  return function (dispatch) {
    server
      .get(`/users/${userId}/listings`)
      .then((res) => dispatch(storeFetchedListings(res.data.listings)));
  };
}
