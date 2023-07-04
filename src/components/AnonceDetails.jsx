import { Button, Stack, Paper, Typography, CardMedia } from "@mui/material";
import React from "react";

const AnonceDetails = ({ Data }) => {
  return Data == null ? (
    <></>
  ) : (
    <>
      <Paper elevation={5} sx={{ width: "90%", margin: "15px auto" }}>
        <Stack direction="column" padding="2rem 2rem" gap={3} width="100%">
          <Stack
            gap={{
              sm: 1,
              md: 2,
            }}
            direction={{
              sm: "column",
              md: "row",
            }}
          >
            <CardMedia
              image={Data.imageUrl}
              sx={{
                height: "400px",
                minWidth: {
                  md: "500px",
                  xs: "100%",
                },
              }}
            ></CardMedia>
            <Stack direction="column" gap={1}>
              <Typography
                variant="h5"
                fontWeight={700}
                color="black"
                fontFamily="fantasy"
                sx={{ overflowWrap: "break-word" }}
              >
                Details
              </Typography>
              <Typography variant="body1">Nom : {Data.nomAnonce}</Typography>{" "}
              <Typography variant="body1">
                type : {Data.type == "0" ? "à louer " : "à acheter"}
              </Typography>
              <Typography variant="body1">
                {Data.pays + " , " + Data.ville + " " + Data.adresse}
              </Typography>
              <Typography variant="body1">
                prix : {Data.prix} dh{" "}
                {Data.type == "location" ? "par nuit" : ""}
              </Typography>
              <Typography variant="body1">
                surface : {Data.surface} m2
              </Typography>
              <Typography variant="body1">
                Nombre Etages : {Data.etages}
              </Typography>
              <Typography variant="body1">
                Nombre Chambres : {Data.chambres}
              </Typography>
              <Typography variant="body1">
                Nombre Salles de bain : {Data.sallesDeBain}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="column" gap={1}>
            <Typography variant="h5" fontWeight={700}>
              Summary :
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              {Data.description}
            </Typography>
          </Stack>
          <Stack direction="column" gap={1}>
            <Typography variant="h5" fontWeight={700}>
              Contact :
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              Email : {Data.email}
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              Telephone : {Data.telephone}
            </Typography>
          </Stack>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          ></div>
        </Stack>
      </Paper>
    </>
  );
};

export default AnonceDetails;
