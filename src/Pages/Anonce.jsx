import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Stack, Paper, Typography, CardMedia } from "@mui/material";
import React from "react";

const Anonce = () => {
  const idAnonce = useParams().id;
  const fontsize = 20;
  const [Data, setData] = React.useState({
    Nom: "",
    Surface: "",
    nbreSalleBain: "",
    nbreChambres: "",
    nbreEtages: "",
    prix: "",
    latitude: "",
    description: "",
    longitude: "",
    email: "",
    telephone: "",
  });
  React.useEffect(() => {
    // fetch();
    setData({
      Nom: "Hotel Hotel Hotel Hotel Hotel  Hotel Hotel Hotel Hotel ",
      nbrEtoiles: "5",
      Surface: "400",
      nbreSalleBain: "3",
      nbreChambres: "3",
      nbreEtages: "3",
      prix: "100",
      description:
        "description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ",
      latitude: "33.57094853077502",
      longitude: "-7.604995965957642",
      ville: "Casablanca",
      region: "Great Casablanca",
      email: "ayoublaarouchi03@gmail.com",
      telephone: "0684629206",
    });
  }, []);
  return (
    <>
      <Header />
      <Stack
        direction="column"
        padding="2rem 2rem"
        gap={3}
        width="100%"
        sx={{
          textAlign: {
            xs: "center",
            sm: "left",
          },
        }}
      >
        <Stack
          gap={{
            sm: 1,
            md: 2,
          }}
          direction={{
            sm: "column",
            md: "row",
          }}
          sx={{
            alignItems: {
              sm: "center",
              md: "flex-start",
            },
          }}
        >
          <CardMedia
            image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
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
              variant="h4"
              fontWeight={500}
              color="black"
              sx={{ overflowWrap: "break-word" }}
            >
              {Data.Nom}
            </Typography>
            <Typography fontSize={fontsize}>
              {Data.ville + " , " + Data.region}
            </Typography>
            <Typography fontSize={fontsize}>
              {Data.nbrEtoiles}/5 stars
            </Typography>
            <Typography fontSize={fontsize}>prix : {Data.prix} dh</Typography>
            <Typography fontSize={fontsize}>
              surface : {Data.surface} m2
            </Typography>
            <Typography fontSize={fontsize}>
              Nombre Etages : {Data.nbreEtages}{" "}
            </Typography>
            <Typography fontSize={fontsize}>
              Nombre Chambres : {Data.nbreChambres}{" "}
            </Typography>
            <Typography fontSize={fontsize}>
              Nombre Salles de bain : {Data.nbreSalleBain}{" "}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" gap={1}>
          <Typography variant="h4" fontWeight={500}>
            Summary :
          </Typography>
          <Typography fontSize={fontsize} sx={{ overflowWrap: "break-word" }}>
            {Data.description}
          </Typography>
        </Stack>
        <Stack direction="column" gap={1}>
          <Typography variant="h4" fontWeight={500}>
            Contact :
          </Typography>
          <Typography fontSize={fontsize} sx={{ overflowWrap: "break-word" }}>
            Email : {Data.email}
          </Typography>
          <Typography fontSize={fontsize} sx={{ overflowWrap: "break-word" }}>
            Telephone : {Data.telephone}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Anonce;
