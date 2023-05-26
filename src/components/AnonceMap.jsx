import React from "react";
import { CardMedia, Button, Typography, Stack } from "@mui/material";
import { useContext } from "react";
import { Context } from "../context/SearchContext";

const AnonceMap = ({
  idAnonce,
  Nom,
  prix,
  latitude,
  longitude,
  nbreEtoiles,
}) => {
  // 0 setAnonceId , 1 setisList

  const context_functions = useContext(Context);
  const [Data, setData] = React.useState({
    Nom: Nom || "",
    prix: prix || "",
    latitude: latitude || "",
    longitude: longitude || "",
    nbreEtoiles: nbreEtoiles || "",
  });
  React.useEffect(() => {
    //Not needed , temporary
    setData({
      Nom: "Serene Haven",
      nbreEtoiles: "5",
      prix: "100",
      latitude: "33.57094853077502",
      longitude: "-7.604995965957642",
      ville: "Casblanca",
      region: "Great Casablanca",
    });
  }, []);
  return (
    <Stack>
      <CardMedia
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        sx={{
          height: { sm: "400px", xs: "300px" },
          width: { sm: "400px", xs: "300px" },
        }}
      >
        <Stack
          height="100%"
          direction="column"
          justifyContent="end"
          padding={2}
          color="white"
          sx={{ backgroundColor: "rgb(0,0,0,0.2)" }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {Data.Nom}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {Data.nbreEtoiles}/5 stars
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            prix : {Data.prix} dh
          </Typography>
          <Typography
            variant="body1"
            fontWeight={500}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {Data.ville + " , " + Data.region}
          </Typography>
        </Stack>
      </CardMedia>
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "fit-content",
          marginLeft: "auto",
          marginTop: "15px",
        }}
        onClick={() => {
          context_functions.setIdAnonce(idAnonce);
          context_functions.setisList(false);
        }}
        href={`/Anonce/${idAnonce}`}
      >
        full details
      </Button>
    </Stack>
  );
};

export default AnonceMap;
