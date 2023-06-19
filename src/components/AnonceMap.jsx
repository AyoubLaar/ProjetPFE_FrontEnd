import React from "react";
import { CardMedia, Button, Typography, Stack } from "@mui/material";

const AnonceMap = ({ anonce }) => {
  return anonce != null ? (
    <Stack>
      <CardMedia
        image={anonce.imageUrl}
        sx={{
          width: "300px",
          height: "400px",
          maxWidth: "100vw",
        }}
      >
        <a
          href={`/Anonce/${anonce.idAnonce}`}
          style={{
            width: "100%",
            height: "100%",
            textDecoration: "none",
            color: "white",
          }}
        >
          <Stack
            height="100%"
            direction="column"
            justifyContent="end"
            padding={2}
            sx={{
              "&:hover": {
                backgroundColor: "rgb(0,0,0,0.5)",
              },
              backgroundColor: "rgb(0,0,0,0.2)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {anonce.nomAnonce}
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {anonce.nbreEtoiles}/5 stars
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              prix : {anonce.prix} dh
            </Typography>
            <Typography
              variant="body1"
              fontWeight={500}
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {anonce.idVille + " , " + anonce.idRegion}
            </Typography>
          </Stack>
        </a>
      </CardMedia>
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "fit-content",
          marginTop: "15px",
        }}
        href={`/Anonce/${anonce.idAnonce}`}
      >
        full details
      </Button>
    </Stack>
  ) : (
    <></>
  );
};

export default AnonceMap;
