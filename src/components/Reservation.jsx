import { Button, Typography } from "@mui/material";
import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export default function Reservation({
  reservations,
  reservation,
  setReservations,
}) {
  const [confirmed, setConfirmed] = React.useState(false);
  const handleCancel = (id) => {
    if (confirmed) {
      const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      };
      fetch(
        "http://localhost:8080/api/Membre/Reservations/cancel?id=" + id,
        options
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          alert("Cancelation successfull !");
          setReservations(
            reservations.map((res) => {
              if (res.id == id) {
                res = { ...res, status: "cancelled" };
              }
              return res;
            })
          );
        })
        .catch((e) => {
          alert("Cancelation failed !");
        });
    } else {
      setConfirmed(true);
    }
  };

  return (
    <TableRow
      key={reservation.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <a href={`/Anonce/${reservation.idAnonce}`}>{reservation.anonceName}</a>
      </TableCell>
      <TableCell>
        <Typography>{reservation.emailClient}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{reservation.DateReservationArrive}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{reservation.DateReservationDepart}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{reservation.nbrEnfants}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{reservation.nbrAdultes}</Typography>
      </TableCell>
      <TableCell>
        <Typography
          color={
            reservation.status == "refused" || reservation.status == "cancelled"
              ? "error"
              : "primary"
          }
        >
          {reservation.status == "enAttenteEvaluation"
            ? "en attente d'evaluation"
            : reservation.status}
        </Typography>
      </TableCell>
      <TableCell>
        {reservation.status == "pending" ||
        reservation.status == "cancelled" ? (
          <Button
            color={"error"}
            disabled={
              reservation.status != "cancelled" &&
              reservation.status != "pending"
            }
            onClick={() => {
              handleCancel(reservation.id);
            }}
            sx={{ padding: "0" }}
          >
            {confirmed ? "confirmer" : "cancel"}
          </Button>
        ) : reservation.status == "enAttenteEvaluation" ? (
          <Button
            color={"primary"}
            href={"evaluer/" + reservation.id}
            sx={{ padding: "0" }}
          >
            evaluer
          </Button>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
}
