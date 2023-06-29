import { Box } from "@mui/material";
import AnonceAdmin from "./AnonceAdmin.jsx";
import React from "react";

export default function ListAnonceAdmin({ anonces }) {
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
        anonces.map((anonce) => <AnonceAdmin anonce={anonce} />)
      ) : (
        <></>
      )}
    </Box>
  );
}
