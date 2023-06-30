import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";

const Reservations = ({ reservations, setReservations }) => {
  console.log(reservations);

  const handleCancel = (id) => {
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
  };

  const handleUnCancel = (id) => {
    const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + jwt,
      },
    };
    fetch(
      "http://localhost:8080/api/Membre/Reservations/uncancel?id=" + id,
      options
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        alert("enabling succesfull !");
        setReservations(
          reservations.map((res) => {
            if (res.id == id) {
              res = { ...res, status: "pending" };
            }
            return res;
          })
        );
      })
      .catch((e) => {
        alert("enabling failed !");
      });
  };

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
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <a href={`/Anonce/${row.id}`}>{row.anonceName}</a>
            </TableCell>
            <TableCell>
              <Typography>{row.emailClient}</Typography>
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
                  row.status == "refused" || row.status == "cancelled"
                    ? "error"
                    : "primary"
                }
              >
                {row.status == "enAttenteEvaluation"
                  ? "en attente d'evaluation"
                  : row.status}
              </Typography>
            </TableCell>
            <TableCell>
              {row.status == "pending" || row.status == "cancelled" ? (
                <Button
                  color={"error"}
                  disabled={
                    row.status != "cancelled" && row.status != "pending"
                  }
                  onClick={() => {
                    row.status == "cancelled"
                      ? handleUnCancel(row.id)
                      : handleCancel(row.id);
                  }}
                  sx={{ padding: "0" }}
                >
                  {row.status == "cancelled" ? "enable" : "cancel"}
                </Button>
              ) : row.status == "enAttenteEvaluation" ? (
                <Button
                  color={"primary"}
                  href={"evaluer/" + row.id}
                  sx={{ padding: "0" }}
                >
                  evaluer
                </Button>
              ) : (
                <></>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Reservations;
