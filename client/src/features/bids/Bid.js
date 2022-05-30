import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { format } from "date-fns";

import server from "../../apis/server";
import Link from "../../common/Link";

function Bid() {
  const { addBarBidId } = useParams();
  const [bidData, setBidData] = useState(null);

  useEffect(() => {
    server.get(`/bids/${addBarBidId}`).then((res) => setBidData(res.data));
  }, [addBarBidId]);

  if (bidData === null) {
    return null;
  } else {
    const { listingId, buyerId, sellerId, amount, date, status } = bidData;
    return (
      <Box p={3} sx={{ width: 500 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell variant="head">Listing ID</TableCell>
              <TableCell>{listingId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Date</TableCell>
              <TableCell>{format(new Date(date), "yyyy-MM-dd")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Buyer</TableCell>
              <TableCell>
                <Link to={`/users/${buyerId}`} isUser userId={buyerId} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Seller</TableCell>
              <TableCell>
                <Link to={`/users/${sellerId}`} isUser userId={sellerId} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Amount</TableCell>
              <TableCell>{amount.toLocaleString()} SGD</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Status</TableCell>
              <TableCell>{status} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    );
  }
}

export default Bid;
