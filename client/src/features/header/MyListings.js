import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function MyListings() {
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  return (
    <Button color="inherit" onClick={() => navigate(`/users/${userId}`)}>
      My Listings
    </Button>
  );
}

export default MyListings;
