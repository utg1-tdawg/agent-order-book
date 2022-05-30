import { Grid, Box, Typography, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LinkIcon from "@mui/icons-material/Link";
import ShareIcon from "@mui/icons-material/Share";
import BidsTable from "../bids/BidsTable";
import CreateBidButton from "../bids/CreateBidButton";

function Listing({ address, url, listingId }) {
  return (
    <Paper elevation={12} sx={{ backgroundColor: "#d2d4d6" }}>
      <Box px={2} py={5} sx={{ border: 1 }}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <HomeIcon />
              </Grid>

              <Grid item>
                <Typography sx={{ fontWeight: "bold" }}>{address}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <LinkIcon />
              </Grid>

              <Grid item>
                <Typography>{url}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <ShareIcon />
              </Grid>

              <Grid item>
                <Typography>{listingId}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <BidsTable listingId={listingId} />
          </Grid>

          <br />

          <Grid item>
            <CreateBidButton listingId={listingId} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default Listing;
