import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Button, Stack, Paper, Typography, CardMedia } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import React from "react";
import ListCommentaire from "../components/ListCommentaires";

const Anonce = () => {
  const idAnonce = useParams().id;
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
    Commentaires: [],
  });
  React.useEffect(() => {
    // fetch();
    setData({
      Nom: "Serene Haven ",
      nbrEtoiles: "5",
      Surface: "400",
      nbreSalleBain: "3",
      nbreChambres: "3",
      nbreEtages: "3",
      prix: "100",
      description:
        "Nestled amidst breathtaking natural surroundings, Serene Haven offers a tranquil retreat for weary travelers seeking solace and rejuvenation. This luxurious boutique hotel blends modern elegance with a touch of rustic charm, creating a captivating ambiance that embraces both comfort and serenity. From the moment you step through its doors, you'll be greeted by warm hospitality and impeccable service, ensuring a memorable stay. Indulge in the opulent rooms and suites adorned with tasteful decor, plush furnishings, and panoramic views that showcase the beauty of the surrounding landscape. Unwind in the spa, where skilled therapists provide blissful treatments to restore your mind, body, and soul. Savor exquisite culinary delights at the hotel's gourmet restaurant, where the expert chefs artfully craft a fusion of international flavors. Whether you're seeking a romantic getaway, a peaceful retreat, or a haven for your next business trip, Serene Haven promises an enchanting experience that will leave you refreshed and inspired ",
      latitude: "33.57094853077502",
      longitude: "-7.604995965957642",
      ville: "Casablanca",
      region: "Great Casablanca",
      email: "ayoublaarouchi03@gmail.com",
      telephone: "0684629206",
      Commentaires: [
        {
          membre: { nom: "Laarouchi", prenom: "Ayoub" },
          datePub: new Date(),
          contenu: "hadchi nadi bzaf !",
        },
        {
          membre: { nom: "Laarouchi", prenom: "Ayoub" },
          datePub: new Date(),
          contenu: "hadchi nadi bzaf !",
        },
        {
          membre: { nom: "Laarouchi", prenom: "Ayoub" },
          datePub: new Date(),
          contenu: "hadchi nadi bzaf !",
        },
        {
          membre: { nom: "Laarouchi", prenom: "Ayoub" },
          datePub: new Date(),
          contenu: "hadchi nadi bzaf !",
        },
        {
          membre: { nom: "Laarouchi", prenom: "Ayoub" },
          datePub: new Date(),
          contenu: "hadchi nadi bzaf !",
        },
        {
          membre: { nom: "Laarouchi", prenom: "Ayoub" },
          datePub: new Date(),
          contenu: "hadchi nadi bzaf !",
        },
        {
          membre: { nom: "Laarouchi", prenom: "Ayoub" },
          datePub: new Date(),
          contenu: "hadchi nadi bzaf !",
        },
        {
          membre: { nom: "Laarouchi", prenom: "Ayoub" },
          datePub: new Date(),
          contenu: "hadchi nadi bzaf !",
        },
      ],
    });
  }, []);
  return (
    <>
      <Header />
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
                variant="h5"
                fontWeight={700}
                color="black"
                fontFamily="fantasy"
                sx={{ overflowWrap: "break-word" }}
              >
                {Data.Nom}
              </Typography>
              <Typography variant="body1">
                {"Location : " + Data.ville + " , " + Data.region}
              </Typography>
              <Typography variant="body1">{Data.nbrEtoiles} stars</Typography>
              <Typography variant="body1">prix : {Data.prix} dh</Typography>
              <Typography variant="body1">
                surface : {Data.surface} m2
              </Typography>
              <Typography variant="body1">
                Nombre Etages : {Data.nbreEtages}{" "}
              </Typography>
              <Typography variant="body1">
                Nombre Chambres : {Data.nbreChambres}{" "}
              </Typography>
              <Typography variant="body1">
                Nombre Salles de bain : {Data.nbreSalleBain}{" "}
              </Typography>
              <a href={"/Search/" + idAnonce}>
                <Button
                  startIcon={<MapIcon />}
                  variant="contained"
                  sx={{ width: "fit-content" }}
                >
                  Show On Map
                </Button>
              </a>
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
          >
            <a href={"/Reserver/" + idAnonce}>
              <Button variant="contained">Reserver</Button>
            </a>
          </div>
          <ListCommentaire commentaires={Data.Commentaires} />
        </Stack>
      </Paper>
    </>
  );
};

export default Anonce;
