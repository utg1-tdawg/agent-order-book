import { Grid, Box } from "@mui/material";
import RespondButton from "./RespondButton";
import Link from "../../common/Link";

function PendingBid({ bidId, isWaitingForUser }) {
  return (
    <Box p={2}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Link to={`/bids/${bidId}`}>{bidId}</Link>
        </Grid>

        <Grid item>
          <Grid container justifyContent="flex-end" spacing={2}>
            {isWaitingForUser ? (
              <>
                <Grid item>
                  <RespondButton responseType="accept" bidId={bidId} />
                </Grid>

                <Grid item>
                  <RespondButton responseType="decline" bidId={bidId} />
                </Grid>
              </>
            ) : (
              <Grid item>
                <RespondButton responseType="rescind" bidId={bidId} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PendingBid;
