import { Box } from "@mui/material";
import Anonce from "./Anonce.jsx";
import React from "react";
import { Typography } from "@mui/material";

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
        anonces.length > 0 ? (
          anonces.map((anonce) => <Anonce anonce={anonce} />)
        ) : (
          <Typography variant="h5">Aucune Anonce trouvé</Typography>
        )
      ) : (
        <></>
      )}
    </Box>
  );
}
