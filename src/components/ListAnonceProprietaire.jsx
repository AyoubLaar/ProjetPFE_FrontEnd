import { Box } from "@mui/material";
import AnonceProprietaire from "./AnonceProprietaire.jsx";
import React from "react";

export default function ListAnonceProprietaire({ anonces }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 5,
        padding: 3,
      }}
    >
      {anonces != null ? (
        anonces.map((anonce) => <AnonceProprietaire anonce={anonce} />)
      ) : (
        <></>
      )}
    </Box>
  );
}
