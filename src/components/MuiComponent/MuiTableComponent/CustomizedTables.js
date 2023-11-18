import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import moment from "moment";
import eventStatus from "../../../utils/eventStatus";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function CustomizedTables({ bookingList, bookingDetails }) {
  const getAddressType = (bookingDetails) => {
    if (bookingDetails?.address?.addressType !== "Studio Address") {
      return `${bookingDetails?.address?.["flat-house-no"] ?? ""} ${
        bookingDetails?.address?.["area-street"] ?? ""
      },
      ${bookingDetails?.address?.["pin-code"] ?? ""} ${
        bookingDetails?.address?.["city"]?.label ||
        bookingDetails?.address?.["city"] ||
        ""
      } ${bookingDetails?.address?.["state"]?.label || ""},${
        bookingDetails?.address?.["Country"]?.label || ""
      }`;
    }
  };

  const bookingStatus = (date) => {
    const currentDate = moment(new Date());
    const eventDate = moment(date);
    return eventDate >= currentDate ? "Up-coming" : "completed";
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow style={{ textAlign: "left" }}>
            <StyledTableCell width="5%">S.no</StyledTableCell>
            <StyledTableCell>Booking Id</StyledTableCell>

            <StyledTableCell align="left">Date</StyledTableCell>
            <StyledTableCell align="left" width="30%">
              Status
            </StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookingList.map((bookingItem, ind) => (
            <StyledTableRow key={bookingItem.name}>
              <StyledTableCell component="th" scope="row">
                {ind}
              </StyledTableCell>
              <StyledTableCell align="left">{bookingItem.key}</StyledTableCell>

              <StyledTableCell align="left">
                {`${moment(bookingItem.from).format("DD/MM/YYYY")} - ${moment(
                  bookingItem.to
                ).format("DD/MM/YYYY")}`}
              </StyledTableCell>
              <StyledTableCell align="left">
                {eventStatus(bookingItem.to)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {" "}
                <Button size="small" variant="contained">
                  View
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
