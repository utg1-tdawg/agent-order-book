import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TextField, Grid, Box, Container, Button } from "@mui/material";
import server from "../../apis/server";

function CreateListingForm() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const formik = useFormik({
    initialValues: {
      address: "",
      url: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (formValues) => {
      server
        .post("/listings", { ...formValues, sellerId: userId })
        .then(() => navigate(`/users/${userId}`));
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
              type="text"
              label="Address"
              {...formik.getFieldProps("address")}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              type="url"
              label="Listing page (URL)"
              {...formik.getFieldProps("url")}
              helperText={formik.touched.url && formik.errors.url}
            />
          </Grid>

          <Grid item>
            <Box justifyContent="center" display="flex">
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

export default CreateListingForm;
