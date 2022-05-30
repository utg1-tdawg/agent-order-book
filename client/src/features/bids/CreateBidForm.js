import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TextField, Button, Grid, Box, Container } from "@mui/material";
import server from "../../apis/server";

function CreateBidForm() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const buyerId = useSelector((state) => state.auth.userId);
  const sellerId = useSelector((state) => state.userPage.id);
  const createBidListingId = useSelector(
    (state) => state.listings.createBidListingId
  );

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (formValues) => {
      if (!isLoggedIn) {
        navigate("/login");
      } else {
        server
          .post("/bids", {
            ...formValues,
            sellerId,
            buyerId,
            listingId: createBidListingId,
          })
          .then((res) => {
            navigate(`/users/${sellerId}`);
          })
          .catch((err) => {});
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={2}
          alignItems="stretch"
          justifyContent="center"
          direction="column"
          style={{ minHeight: "100vh" }}
        >
          <Grid item>
            <TextField
              fullWidth
              type="number"
              label="Amount (SGD)"
              {...formik.getFieldProps("amount")}
            />
          </Grid>

          <Grid item>
            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default CreateBidForm;
