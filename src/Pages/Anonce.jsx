import { useParams } from "react-router-dom";
import Header from "../components/Header";
import {
  Button,
  Stack,
  Paper,
  Typography,
  CardMedia,
  Box,
  Tab,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import React from "react";
import ListCommentaire from "../components/ListCommentaires";
import ListEvaluations from "../components/ListEvaluations";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import Rating from "@mui/material/Rating";

const Anonce = () => {
  const idAnonce = React.useRef(useParams().id);
  const [Data, setData] = React.useState(null);
  const [value, setValue] = React.useState("1");
  const [evaluations, setEvaluations] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    if (evaluations == null) {
      fetch(
        "http://localhost:8080/api/Search/Anonce/Evaluations?id=" +
          idAnonce.current
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP status " + res.status);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setEvaluations(data);
        })
        .catch((e) => {
          console.log("could not retrieve evaluations !");
        });
    }
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
                {Data.pays + " , " + Data.ville + " " + Data.adresse}
              </Typography>
              <Typography variant="body1">
                type : {Data.type == "location" ? "à louer " : "à acheter"}
              </Typography>
              <Rating readOnly value={Data.nbrEtoiles} />
              <Typography variant="body1">
                prix : {Data.prix} dh{" "}
                {Data.type == "location" ? "par nuit" : ""}
              </Typography>
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
            {Data.type == "achat" ? (
              <></>
            ) : (
              <Button
                href={"/Reserver/" + idAnonce.current}
                variant="contained"
              >
                Reserver
              </Button>
            )}
          </div>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label={"Comments " + "(" + Data.Commentaires.length + ")"}
                  value="1"
                />
                {Data.type == "location" ? (
                  <Tab label="Evaluations" value="2" />
                ) : (
                  <></>
                )}
              </TabList>
            </Box>
            <TabPanel value="1">
              <ListCommentaire commentaires={Data.Commentaires} />
            </TabPanel>
            <TabPanel value="2">
              <ListEvaluations evaluations={evaluations} />
            </TabPanel>
          </TabContext>
        </Stack>
      </Paper>
    </>
  );
};

export default Anonce;
