import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import BidsHeader from "./BidsHeader";
import BidsRow from "./BidsRow";
import server from "../../apis/server";

function BidsTable({ listingId }) {
  const [bids, setBids] = useState(null);
  const fetchedListings = useSelector(
    (state) => state.listings.fetchedListings
  );

  useEffect(() => {
    server
      .get(`/listings/${listingId}/bids`)
      .then((res) => setBids(res.data.bids));
  }, [fetchedListings]);

  return (
    bids !== null &&
    bids.length > 0 && (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <BidsHeader />
          <TableBody>
            {bids.map((bid) => (
              <BidsRow
                key={bid.id}
                date={bid.date}
                bidId={bid.id}
                buyerId={bid.buyerId}
                amount={bid.amount}
                status={bid.status}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}

export default BidsTable;
