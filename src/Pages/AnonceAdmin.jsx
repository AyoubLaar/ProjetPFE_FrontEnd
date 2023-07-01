import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { Button, Stack, Paper, Typography, CardMedia } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import ReservationsAnonce from "../components/ReservationsAnonce";

const DetailsAnonce = () => {
  const jwt = React.useRef(window.localStorage.getItem("ESTATE_HUB_JWT"));
  const idAnonce = React.useRef(useParams().id);
  const [Data, setData] = React.useState(null);
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt,
      },
    };
    fetch(
      "http://localhost:8080/api/Admin/Anonce?id=" + idAnonce.current,
      options
    )
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
      <Paper sx={{ typography: "body1", margin: "30px" }} elevation={10}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Details de l'anonce" value="1" />

              <Tab label="Reservations" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Stack direction="column" gap={3} width="100%">
              <Stack direction="row" justifyContent="end" gap={3}>
                <Button
                  disabled={Data.status == "adminDisabled"}
                  onClick={() => {
                    activer();
                  }}
                  variant="contained"
                  color={Data.status == "enabled" ? "error" : "primary"}
                >
                  <Typography>
                    {Data.status == "enabled" ? "desactiver" : "activer"}
                  </Typography>
                </Button>
                <Button
                  href={"/Modifier/Anonce/" + idAnonce.current}
                  variant="contained"
                >
                  <Typography>Modifier</Typography>
                </Button>
              </Stack>
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
                  <Typography>
                    etat :{" "}
                    {Data.status == "adminDisabled"
                      ? "desactivé par l'admin"
                      : Data.status == "userDisabled"
                      ? "desactivé par l'utilisateur"
                      : "active"}
                  </Typography>
                  <Typography variant="body1">
                    type : {Data.type == "location" ? "à louer" : "à acheter"}
                  </Typography>
                  <Typography variant="body1">
                    {Data.pays + " , " + Data.ville + " " + Data.adresse}
                  </Typography>
                  <Typography variant="body1">
                    {Data.nbrEtoiles} stars
                  </Typography>
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
            </Stack>
          </TabPanel>

          <TabPanel sx={{ overflowX: "auto" }} value="2">
            <ReservationsAnonce />
          </TabPanel>
        </TabContext>
      </Paper>
    </>
  );
};

export default DetailsAnonce;
