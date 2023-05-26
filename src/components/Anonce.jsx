import React from "react";
import { Paper, Button, Typography, Stack } from "@mui/material";
import { useContext } from "react";
import { Context } from "../context/SearchContext";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";

export default function Anonce({
  idAnonce,
  Nom,
  prix,
  latitude,
  longitude,
  nbreEtoiles,
}) {
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
      <Paper
        variant="elevation"
        elevation={3}
        sx={{
          position: "relative",
          width: "300px",
          height: "400px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2)",
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
          href={"/Search/" + idAnonce}
        >
          Map
        </Button>
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
        </a>
      </Paper>
    </Stack>
  );
}
