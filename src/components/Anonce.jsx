import React from "react";
import { CardMedia, Button, Typography, Stack } from "@mui/material";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import Rating from "@mui/material/Rating";

export default function Anonce({ anonce }) {
  console.log(anonce);
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
              backgroundColor: "rgb(0,0,0,0.3)",
              "&:hover": {
                backgroundColor: "rgb(0,0,0,0.5)",
              },
            }}
          >
            <Typography variant="body1" fontWeight={700}>
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
            <Rating readOnly value={anonce.nbreEtoiles} />
            <Typography variant="body1" fontWeight={500}>
              prix : {anonce.prix} dh{" "}
              {anonce.type == "location" ? "par nuit" : ""}
            </Typography>
            <Typography
              variant="body1"
              fontWeight={500}
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {anonce.idPays + " , " + anonce.idVille}
            </Typography>
          </Stack>
        </a>
      </CardMedia>
    </Stack>
  );
}
