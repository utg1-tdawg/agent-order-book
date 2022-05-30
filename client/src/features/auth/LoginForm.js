import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
  Box,
  Container,
} from "@mui/material";
import { logIn } from "./authSlice";
import server from "../../apis/server";

function LoginForm() {
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      licenseNum: "",
      password: "",
    },
    onSubmit: (formValues) => {
      server
        .post("/login", formValues)
        .then((res) => {
          window.localStorage.setItem("userId", res.data);
          dispatch(logIn(res.data));
          navigate(`/users/${res.data}`);
        })
        .catch((err) => {
          setErrMsg(err.response.data);
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
              label="CEA License No."
              {...formik.getFieldProps("licenseNum")}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              type="password"
              label="Password"
              {...formik.getFieldProps("password")}
            />
          </Grid>

          {errMsg !== null && (
            <Grid item>
              <Alert severity="error">
                <Typography>{errMsg}</Typography>
              </Alert>
            </Grid>
          )}

          <Grid item>
            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained">
                Log In
              </Button>
            </Box>
          </Grid>

          <Grid item>
            <Box display="flex" justifyContent="center">
              <Typography>
                Not a member? <Link to="/signup">Signup</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default LoginForm;
