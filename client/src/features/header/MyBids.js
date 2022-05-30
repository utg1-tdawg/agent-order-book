import { useState } from "react";
import { Button, Popover } from "@mui/material";
import PendingBids from "../pendingBids/PendingBids";

function MyBids() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        My Bids
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: { width: "500px" },
        }}
      >
        <PendingBids />
      </Popover>
    </>
  );
}

export default MyBids;
