import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import { Paper } from "@mui/material";
import { useParams } from "react-router-dom";

const Reserver = () => {
  const [errorEnfants, seterrorEnfants] = React.useState(false);
  const [errorAdultes, seterrorAdultes] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const id = useParams().id;

  const handleSubmit = (event) => {
    setDisabled(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (
      formData.get("DateReservationArrive") == "" ||
      formData.get("DateReservationDepart") == "" ||
      formData.get("nbrEnfants") == null ||
      formData.get("nbrAdultes") == null
    ) {
      alert("Veuillez remplir tout les champs !");
      setDisabled(false);
    } else if (
      formData.get("emailClient") == "" &&
      formData.get("telephoneClient") == ""
    ) {
      alert("Remplissez au moins l'un des deux champs Email ou Telephone !");
      setDisabled(false);
    } else {
      const reservation_dto = {
        id: id,
        DateReservationArrive: formData.get("DateReservationArrive"),
        DateReservationDepart: formData.get("DateReservationDepart"),
        emailClient: formData.get("emailClient"),
        nbrEnfants: formData.get("nbrEnfants"),
        nbrAdultes: formData.get("nbrAdultes"),
        telephoneClient: formData.get("telephoneClient"),
      };
      console.log(reservation_dto);
      const token = window.localStorage.getItem("ESTATE_HUB_JWT");
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation_dto),
      };
      fetch("http://localhost:8080/api/Membre/Reserver", options)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP status " + res.status);
          }
          alert("Reservation effectué avec succés");
          window.location.assign("/");
        })
        .catch((e) => {
          alert("Reservation invalide !");
        })
        .finally(() => {
          setDisabled(false);
        });
    }
  };
  return (
    <>
      <Header />
      <Container component="main" maxWidth="sm">
        <Paper>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            padding={2}
          >
            <Typography component="h1" variant="h5">
              Reserver
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Date d'arrivee"
                    type="date"
                    name="DateReservationArrive"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Date de depart"
                    type="date"
                    name="DateReservationDepart"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Enfants"
                    type="number"
                    name="nbrEnfants"
                    InputLabelProps={{ shrink: true }}
                    error={errorEnfants}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        seterrorEnfants(true);
                      } else {
                        seterrorEnfants(false);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Adultes"
                    type="number"
                    name="nbrAdultes"
                    InputLabelProps={{ shrink: true }}
                    error={errorAdultes}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        seterrorAdultes(true);
                      } else {
                        seterrorAdultes(false);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    id="telephoneClient"
                    label="Telephone"
                    name="telephoneClient"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    id="emailClient"
                    label="Email"
                    name="emailClient"
                    helperText="remplir au moins l'un des deux champs Email ou Telephone"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={disabled}
              >
                RESERVER
              </Button>
              <Grid container justifyContent="center"></Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Reserver;
