import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

const Reservations = () => {
  const [Data, setData] = React.useState(null);
  React.useEffect(() => {
    const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + jwt,
      },
    };
    fetch("http://localhost:8080/api/Membre/Reservations", options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP status " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        console.log("exception thrown!");
      });
  }, []);

  return Data == null ? (
    <></>
  ) : (
    <Table aria-label="simple table" sx={{ width: "100%", overflow: "hidden" }}>
      <TableHead>
        <TableRow>
          <TableCell>Nom Anonce</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Date Arrive</TableCell>
          <TableCell>Date depart</TableCell>
          <TableCell>Enfants</TableCell>
          <TableCell>Adultes</TableCell>
          <TableCell>Etat</TableCell>
          <TableCell>Cancel</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Data.map((row) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <a href={`/Anonce/${row.id}`}>{row.anonceName}</a>
            </TableCell>
            <TableCell>{row.emailClient}</TableCell>
            <TableCell>{row.DateReservationArrive}</TableCell>
            <TableCell>{row.DateReservationDepart}</TableCell>
            <TableCell>{row.nbrEnfants}</TableCell>
            <TableCell>{row.nbrAdultes}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>
              <Button
                color="error"
                disabled={
                  row.status == "accepted" ||
                  row.status == "refused" ||
                  row.status == "cancelled"
                }
                onClick={() => {
                  fetch("");
                }}
              >
                {row.accepted ? "cannot cancel" : "cancel"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Reservations;
