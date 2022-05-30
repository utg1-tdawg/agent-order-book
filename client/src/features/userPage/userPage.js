import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import Bio from "./Bio";
import server from "../../apis/server";
import Listing from "../listings/Listing";
import { storeUserData } from "./userPageSlice";
import { fetchListings } from "../listings/listingsSlice";

function UserPage() {
  const dispatch = useDispatch();
  const { addBarUserId } = useParams();
  const { id, name, licenseNum, contactNum } = useSelector(
    (state) => state.userPage
  );

  const fetchedListings = useSelector(
    (state) => state.listings.fetchedListings
  );

  useEffect(() => {
    server.get(`/users/${addBarUserId}`).then((res) => {
      dispatch(storeUserData(res.data));
    });

    if (id !== null) {
      dispatch(fetchListings(id));
    }
  }, [addBarUserId, id]);

  return (
    id !== null && (
      <Box sx={{ width: 800 }} py={2} px={5}>
        <Bio
          name={name}
          userId={id}
          licenseNum={licenseNum}
          contactNum={contactNum}
        />

        <Grid container direction="column" spacing={5}>
          {fetchedListings.map((l) => (
            <Grid item key={l.id}>
              <Listing listingId={l.id} address={l.address} url={l.url} />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  );
}

export default UserPage;
