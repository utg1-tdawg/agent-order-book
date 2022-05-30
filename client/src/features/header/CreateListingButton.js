import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function CreateListingButton() {
  const navigate = useNavigate();

  return (
    <Button color="inherit" onClick={() => navigate("/create-listing")}>
      Create Listing
    </Button>
  );
}

export default CreateListingButton;
