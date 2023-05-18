import React from "react";
import { Paper, Button, Typography, Stack } from "@mui/material";
import { useContext } from "react";
import { Context } from "../Contexts/SearchContext";

export default function Anonce({ idAnonce }) {
  // 0 setAnonceId , 1 setisList
  const context_functions = useContext(Context);
  const [Data, setData] = React.useState({
    Nom: "",
    Surface: "",
    nbreSalleBain: "",
    nbreChambres: "",
    nbreEtages: "",
    prix: "",
    latitude: "",
    longitude: "",
    categories: [],
  });
  React.useEffect(() => {
    // fetch();
    setData({
      Nom: "HotelHotelHotelHotelHotelHotel",
      nbrEtoiles: "5",
      Surface: "400",
      nbreSalleBain: "3",
      nbreChambres: "3",
      nbreEtages: "3",
      prix: "100",
      latitude: "33.57094853077502",
      longitude: "-7.604995965957642",
      ville: "Casblanca",
      region: "Great Casablanca",
    });
  }, []);
  return (
    <Stack>
      <Paper
        variant="elevation"
        elevation={3}
        sx={{
          width: "300px",
          height: "400px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2)",
        }}
      >
        <a
          href={`/Anonce/${idAnonce}`}
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
              backgroundColor: "rgb(0,0,0,0.2)",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={900}
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {Data.Nom}
            </Typography>
            <Typography variant="h6" fontWeight={500}>
              {Data.nbrEtoiles}/5 stars
            </Typography>
            <Typography variant="h6" fontWeight={500}>
              prix : {Data.prix} dh
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={500}
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {Data.ville + " , " + Data.region}
            </Typography>
          </Stack>
        </a>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          context_functions.setIdAnonce(idAnonce);
          context_functions.setisList(false);
        }}
      >
        Show On Map
      </Button>
    </Stack>
  );
}
