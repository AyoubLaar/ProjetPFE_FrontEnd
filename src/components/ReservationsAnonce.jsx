import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router";

const ReservationsAnonce = () => {
  const idAnonce = React.useRef(useParams().id);
  const jwt = React.useRef(window.localStorage.getItem("ESTATE_HUB_JWT"));
  const [reservations, setReservations] = React.useState(null);

  React.useEffect(() => {
    if (reservations == null) {
      fetch(
        "http://localhost:8080/api/Membre/Anonce/Retrieve/Reservations?id=" +
          idAnonce.current,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + jwt.current,
          },
        }
      )
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          setReservations(data);
        })
        .catch((e) => {
          alert("UnAuthorized !");
          window.location.assign("/");
        });
    }
  }, []);

  return reservations == null ? (
    <></>
  ) : (
    <Table aria-label="simple table" sx={{ width: "100%", overflow: "hidden" }}>
      <TableHead>
        <TableRow>
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
            <Typography>Accept</Typography>
          </TableCell>
          <TableCell>
            <Typography>Refuse</Typography>
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
              <Typography>{row.emailClient}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{row.telephone || "-"}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{row.DateReservationArrive}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{row.DateReservationDepart}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{row.nbrEnfants}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{row.nbrAdultes}</Typography>
            </TableCell>
            <TableCell>
              <Typography
                color={
                  row.status == "cancelled" || row.status == "refused"
                    ? "error"
                    : row.status == "accepted"
                    ? "success"
                    : "primary"
                }
              >
                {row.status}
              </Typography>
            </TableCell>
            <TableCell>
              <Button
                color="primary"
                disabled={row.status != "pending"}
                onClick={() => {
                  row.status == "cancelled"
                    ? handleUnCancel(row.id)
                    : handleCancel(row.id);
                }}
              >
                accept
              </Button>
            </TableCell>
            <TableCell>
              <Button
                color="error"
                disabled={row.status != "pending"}
                onClick={() => {
                  row.status == "cancelled"
                    ? handleUnCancel(row.id)
                    : handleCancel(row.id);
                }}
              >
                refuse
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReservationsAnonce;
