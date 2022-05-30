import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function LoginButton() {
  const navigate = useNavigate();
  return (
    <Button color="inherit" onClick={() => navigate("/login")}>
      Log In
    </Button>
  );
}

export default LoginButton;
