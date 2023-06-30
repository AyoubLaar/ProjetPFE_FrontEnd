import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Rating, Typography } from "@mui/material";

const ReservationsAnonceAdmin = ({ reservations }) => {
  return reservations == null ? (
    <></>
  ) : (
    <Table aria-label="simple table" sx={{ width: "100%", overflow: "hidden" }}>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography>Membre</Typography>
          </TableCell>
          <TableCell>
            <Typography>Email</Typography>
          </TableCell>
          <TableCell>
            <Typography>Telephone</Typography>
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
            <Typography>Etoiles</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reservations.map((row) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>
              <Typography>
                <a href={"/admin/user/" + row.idUser}>{row.idUser}</a>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>{row.email || "-"}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{row.telephone || "-"}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{row.dateArrive}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{row.dateDepart}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{row.enfants}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{row.adultes}</Typography>
            </TableCell>
            <TableCell>
              <Typography
                color={
                  row.status == "cancelled" || row.status == "refused"
                    ? "error"
                    : "primary"
                }
              >
                {row.status}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                <Rating readOnly value={row.etoiles || 0} />
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReservationsAnonceAdmin;
