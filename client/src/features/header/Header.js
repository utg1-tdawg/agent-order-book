import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AppBar, Box, Toolbar, Stack } from "@mui/material";
import HomeButton from "./HomeButton";
import UserSearchBar from "./UserSearchBar";
import CreateListingButton from "./CreateListingButton";
import MyListings from "./MyListings";
import MyBids from "./MyBids";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <HomeButton />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" spacing={2}>
              {<UserSearchBar />}
              {isLoggedIn && <CreateListingButton />}
              {isLoggedIn && <MyBids />}
              {isLoggedIn && <MyListings />}
              {isLoggedIn ? <LogoutButton /> : <LoginButton />}
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
}

export default Header;
