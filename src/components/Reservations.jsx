import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import Reservation from "./Reservation";

const Reservations = ({ reservations, setReservations }) => {
  return reservations == null ? (
    <></>
  ) : (
    <Table aria-label="simple table" sx={{ width: "100%", overflow: "hidden" }}>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography>Nom Anonce</Typography>
          </TableCell>
          <TableCell>
            <Typography>Email</Typography>
          </TableCell>
          <TableCell>
            <Typography>Date Arrive</Typography>
          </TableCell>
          <TableCell>
            <Typography>Date depart</Typography>
          </TableCell>
          <TableCell>
            <Typography>Enfants</Typography>
          </TableCell>
          <TableCell>
            <Typography>Adultes</Typography>
          </TableCell>
          <TableCell>
            <Typography>Etat</Typography>
          </TableCell>
          <TableCell>
            <Typography>action</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reservations.map((row) => (
          <Reservation
            reservations={reservations}
            reservation={row}
            setReservations={setReservations}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default Reservations;
