import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { Button, Stack, Paper, Typography, CardMedia } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import ReservationsAnonceAdmin from "../components/ReservationsAnonceAdmin";
import { Rating } from "@mui/material";

const DetailsAnonce = () => {
  const [confirmer, setConfirmer] = React.useState(false);
  const idAnonce = React.useRef(useParams().id);
  const [Data, setData] = React.useState(false);
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleAnonce = () => {
    const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + jwt,
      },
    };
    fetch(
      "http://localhost:8080/api/Admin/Anonce/toggle?id=" + idAnonce.current,
      options
    )
      .then((res) => {
        if (!res.ok) throw new Error();
        if (Data.status === "enabled") {
          setData({ ...Data, status: "adminDisabled" });
        }
        if (Data.status === "userDisabled") {
          setData({ ...Data, status: "userAdminDisabled" });
        }
        if (Data.status === "userAdminDisabled") {
          setData({ ...Data, status: "userDisabled" });
        }
        if (Data.status === "adminDisabled") {
          setData({ ...Data, status: "enabled" });
        }
      })
      .catch((e) => {
        alert("Error toggling !");
      });
  };

  const supprimer = () => {
    if (confirmer == null) return;
    if (confirmer) {
      const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      };
      fetch(
        "http://localhost:8080/api/Admin/Anonce/supprimer?id=" +
          idAnonce.current,
        options
      )
        .then((res) => {
          if (!res.ok) throw new Error();
          setData({ ...Data, status: "adminRemoved" });
          setConfirmer(null);
        })
        .catch((e) => {
          alert("Error de suppression !");
        });
    } else {
      setConfirmer(true);
    }
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
              {Data.type == "location" ? (
                <Tab label="Reservations" value="2" />
              ) : (
                <></>
              )}
            </TabList>
          </Box>
          <TabPanel value="1">
            <Stack direction="column" gap={3} width="100%">
              <Stack direction="row" justifyContent="end" gap={3}>
                <Button variant="contained" onClick={() => toggleAnonce()}>
                  <Typography>{"Toggle"}</Typography>
                </Button>
                <Button
                  onClick={() => {
                    supprimer();
                  }}
                  variant="contained"
                  color={"error"}
                  disabled={
                    Data.status == "adminRemoved" || Data.status == "removed"
                  }
                >
                  <Typography>
                    {Data.status == "adminRemoved" || Data.status == "removed"
                      ? "removed"
                      : confirmer
                      ? "Confirmer"
                      : "supprimer"}
                  </Typography>
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
                    {Data.nom}
                  </Typography>
                  <Typography>
                    proprietaire :{" "}
                    <a href={"/admin/user/" + Data.idProprietaire}>
                      {Data.idProprietaire}
                    </a>
                  </Typography>
                  <Typography>
                    Date de creation : {Data.dateCreation}
                  </Typography>
                  <Typography>
                    etat :{" "}
                    {Data.status == "adminDisabled"
                      ? "desactivé par l'admin"
                      : Data.status == "userDisabled"
                      ? "desactivé par l'utilisateur"
                      : Data.status == "adminRemoved"
                      ? "supprimé par l'admin"
                      : Data.status == "removed"
                      ? "supprimé par l'utilisateur"
                      : "active"}
                  </Typography>
                  <Typography variant="body1">
                    type : {Data.type == "location" ? "à louer" : "à acheter"}
                  </Typography>
                  <Typography variant="body1">
                    {"Location : " + Data.ville + " , " + Data.region}
                  </Typography>
                  <Rating readOnly value={Data.nbretoiles} />
                  <Typography variant="body1">prix : {Data.prix} dh</Typography>
                  <Typography variant="body1">
                    surface : {Data.surface} m2
                  </Typography>
                  <Typography variant="body1">
                    Nombre Etages : {Data.etages}{" "}
                  </Typography>
                  <Typography variant="body1">
                    Nombre Chambres : {Data.chambres}{" "}
                  </Typography>
                  <Typography variant="body1">
                    Nombre Salles de bain : {Data.salles}{" "}
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
            </Stack>
          </TabPanel>

          <TabPanel sx={{ overflowX: "auto" }} value="2">
            <ReservationsAnonceAdmin reservations={Data.reservations} />
          </TabPanel>
        </TabContext>
      </Paper>
    </>
  );
};

export default DetailsAnonce;
