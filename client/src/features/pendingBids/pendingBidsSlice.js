import { createSlice } from "@reduxjs/toolkit";
import server from "../../apis/server";

const INITIAL_STATE = {
  pendingBids: null,
};

const pendingBidsSlice = createSlice({
  name: "pendingBids",
  initialState: INITIAL_STATE,
  reducers: {
    storePendingBids(state, action) {
      state.pendingBids = action.payload;
    },
    resetPendingBids() {
      return INITIAL_STATE;
    },
  },
});

const { storePendingBids, resetPendingBids } = pendingBidsSlice.actions;

export { resetPendingBids };
export default pendingBidsSlice.reducer;

export function fetchPendingBids(userId) {
  return function (dispatch) {
    server
      .get(`/users/${userId}/bids`)
      .then((res) => dispatch(storePendingBids(res.data.bids)));
  };
}
