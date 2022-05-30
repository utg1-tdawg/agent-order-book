import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { storeCreateBidListingId } from "../listings/listingsSlice";

function CreateBidButton({ listingId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      onClick={() => {
        dispatch(storeCreateBidListingId(listingId));
        navigate("/create-bid");
      }}
    >
      Create Bid
    </Button>
  );
}

export default CreateBidButton;
