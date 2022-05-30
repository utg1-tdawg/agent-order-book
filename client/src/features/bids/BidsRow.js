import { format } from "date-fns";
import { TableRow, TableCell } from "@mui/material";
import Link from "../../common/Link";

function BidsRow({ date, bidId, buyerId, amount, status }) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {format(new Date(date), "yyyy-MM-dd")}
      </TableCell>

      <TableCell>
        <Link to={`/users/${buyerId}`} isUser userId={buyerId} />
      </TableCell>
      <TableCell>{amount.toLocaleString()}</TableCell>
      <TableCell>{status}</TableCell>
    </TableRow>
  );
}

export default BidsRow;
