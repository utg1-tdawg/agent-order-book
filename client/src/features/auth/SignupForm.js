import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { TextField, Button, Grid, Box, Container } from "@mui/material";
import * as Yup from "yup";
import server from "../../apis/server";
import { logIn } from "./authSlice";

const schema = Yup.object({
  name: Yup.string().required("Required"),
  licenseNum: Yup.string()
    .matches(/^R[0-9]{6}[A-Z]{1}$/, "Invalid license no.")
    .required("Required")
    .test(
      "license_num_is_unique",
      "License no. has been taken.",
      async (value) => {
        const res = await server.post("/license-num-is-unique", {
          licenseNum: value,
        });
        return res.data["license_num_is_unique"];
      }
    ),
  contactNum: Yup.number().required("Required"),
  password: Yup.string().required("Required"),
});

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      licenseNum: "",
      contactNum: "",
      password: "",
    },
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (formValues) => {
      server
        .post("/users", formValues)
        .then((res) => {
          window.localStorage.setItem("userId", res.data);
          dispatch(logIn(res.data));
          navigate(`/users/${res.data}`);
        })
        .catch((err) => {
          console.log(err);
        });
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
              label="Full Name"
              {...formik.getFieldProps("name")}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              type="text"
              label="CEA License No."
              {...formik.getFieldProps("licenseNum")}
              helperText={formik.touched.licenseNum && formik.errors.licenseNum}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              type="text"
              label="Contact No."
              {...formik.getFieldProps("contactNum")}
              helperText={formik.touched.contactNum && formik.errors.contactNum}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              type="password"
              label="Password"
              {...formik.getFieldProps("password")}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>

          <Grid item>
            <Box justifyContent="center" display="flex">
              <Button type="submit" variant="contained">
                Sign Up
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignupForm;
