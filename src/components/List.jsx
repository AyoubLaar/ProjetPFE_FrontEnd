import { Box } from "@mui/material";
import Anonce from "./Anonce.jsx";
import React from "react";

export default function List({ anonces }) {
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
        anonces.map((anonce) => <Anonce anonce={anonce} />)
      ) : (
        <></>
      )}
    </Box>
  );
}
