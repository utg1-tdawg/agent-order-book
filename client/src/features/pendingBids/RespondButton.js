import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { fetchPendingBids } from "./pendingBidsSlice";
import { fetchListings } from "../listings/listingsSlice";
import server from "../../apis/server";

const responseTypeConfig = {
  accept: { newStatus: "ACCEPTED" },
  decline: { newStatus: "DECLINED" },
  rescind: { newStatus: "RESCINDED" },
};

function RespondButton({ bidId, responseType }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  function handleClick() {
    server
      .put(`/bids/${bidId}`, {
        newStatus: responseTypeConfig[responseType].newStatus,
      })
      .then(() => {
        dispatch(fetchPendingBids(userId));
        dispatch(fetchListings(userId));
      });
  }

  return (
    <Button
      size="small"
      variant={responseType === "accept" ? "contained" : "outlined"}
      onClick={handleClick}
    >
      {responseType}
    </Button>
  );
}

export default RespondButton;
