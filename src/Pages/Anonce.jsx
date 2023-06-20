import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Button, Stack, Paper, Typography, CardMedia } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import React from "react";
import ListCommentaire from "../components/ListCommentaires";

const Anonce = () => {
  const idAnonce = React.useRef(useParams().id);
  const [Data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("http://localhost:8080/api/Search/Anonce?id=" + idAnonce.current)
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP status " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((e) => {
        window.location.assign("/");
      });
  }, []);
  return Data == null ? (
    <></>
  ) : (
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
                {Data.Nom}
              </Typography>
              <Typography variant="body1">
                {"Localisation : " + Data.ville + " , " + Data.region}
              </Typography>
              <Typography variant="body1">
                type : {Data.type == "location" ? "à louer " : "à acheter"}
              </Typography>
              <Typography variant="body1">{Data.nbrEtoiles} stars</Typography>
              <Typography variant="body1">prix : {Data.prix} dh</Typography>
              <Typography variant="body1">
                surface : {Data.Surface} m2
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
              <a href={"/Search/" + idAnonce.current}>
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
            <Button
              href={"/Reserver/" + idAnonce.current}
              variant="contained"
              disabled={Data.type == "achat"}
            >
              Reserver
            </Button>
          </div>
          <ListCommentaire commentaires={Data.Commentaires} />
        </Stack>
      </Paper>
    </>
  );
};

export default Anonce;
