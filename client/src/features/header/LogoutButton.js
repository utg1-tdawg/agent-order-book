import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { logOut } from "../auth/authSlice";
import { resetUserPage } from "../userPage/userPageSlice";
import { resetPendingBids } from "../pendingBids/pendingBidsSlice";
import { resetListings } from "../listings/listingsSlice";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Button
      color="inherit"
      onClick={() => {
        window.localStorage.removeItem("userId");
        dispatch(logOut());
        dispatch(resetUserPage());
        dispatch(resetPendingBids());
        dispatch(resetListings());
        navigate("/");
      }}
    >
      Log Out
    </Button>
  );
}

export default LogoutButton;
