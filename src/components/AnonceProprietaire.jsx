import React from "react";
import { CardMedia, Button, Typography, Stack } from "@mui/material";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";

export default function AnonceProprietaire({ anonce }) {
  return (
    <Stack>
      <CardMedia
        image={anonce.imageUrl}
        sx={{
          position: "relative",
          width: "300px",
          height: "400px",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            color: "white",
            border: "1px solid white",
            borderRadius: "0",
            "&:hover": {
              borderColor: "white",
              backgroundColor: "rgb(255,255,255,.1)",
            },
          }}
          startIcon={<FmdGoodRoundedIcon color="error" />}
          href={"/Search/" + anonce.idAnonce}
        >
          Map
        </Button>
        <a
          href={`/Details/Anonce/${anonce.idAnonce}`}
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
              backgroundColor:
                anonce.status == "enabled"
                  ? "rgb(0,0,0,0.3)"
                  : anonce.status == "userDisabled"
                  ? "rgb(0,0,255,0.3)"
                  : "rgb(255,0,0,0.3)",
            }}
          >
            <Typography variant="body1" fontWeight={500}>
              {anonce.type}
            </Typography>
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
    </Stack>
  );
}
