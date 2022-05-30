import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function BidsHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Date</TableCell>
        <TableCell>Buyer</TableCell>
        <TableCell>Amount (SGD)</TableCell>
        <TableCell>Status</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default BidsHeader;
