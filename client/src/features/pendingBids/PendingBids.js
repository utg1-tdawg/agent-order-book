import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Typography } from "@mui/material";
import PendingBid from "./PendingBid";
import { fetchPendingBids } from "./pendingBidsSlice";

function PendingBids() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const pendingBids = useSelector((state) => state.pendingBids.pendingBids);

  useEffect(() => {
    dispatch(fetchPendingBids(userId));
  }, []);

  if (pendingBids === null) {
    return null;
  } else if (pendingBids.length === 0) {
    return (
      <Box p={2}>
        <Typography>No pending bids</Typography>
      </Box>
    );
  } else {
    const pendingUser = pendingBids.filter((bid) => bid["sellerId"] === userId);
    const pendingOther = pendingBids.filter((bid) => bid["buyerId"] === userId);
    return (
      <Grid container direction="column">
        {pendingUser.map((bid) => (
          <Grid item key={bid.id}>
            <PendingBid bidId={bid.id} isWaitingForUser />
          </Grid>
        ))}

        {pendingOther.map((bid) => (
          <Grid item key={bid.id}>
            <PendingBid bidId={bid.id} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default PendingBids;
