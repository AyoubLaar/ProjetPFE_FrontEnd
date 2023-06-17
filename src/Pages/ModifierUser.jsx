import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import { Paper, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function ModifierUser() {
  const [confirmedPassword, setConfirmedPassword] = React.useState("");
  const [user, setUser] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    console.log("Confirmed : " + confirmedPassword);
    if (
      formData.get("nom") == null ||
      formData.get("prenom") == null ||
      formData.get("dateNaissance") == "" ||
      formData.get("sexe") == null
    ) {
      alert("Veuillez remplir tout les champs !");
    } else {
      if (formData.get("password") != confirmedPassword) {
        alert("Passwords mismatch !");
      } else {
        const Data = {
          nom: formData.get("nom"),
          prenom: formData.get("prenom"),
          dateNaissance: formData.get("dateNaissance"),
          password: formData.get("password"),
          sexe: formData.get("sexe"),
        };
        if (
          formData.get("nom") != user.nom ||
          formData.get("prenom") != user.prenom ||
          formData.get("dateNaissance") != user.dateNaissance ||
          formData.get("sexe") != user.sexe ||
          confirmedPassword != ""
        ) {
          const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
          const options = {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwt,
            },
            body: JSON.stringify(Data),
          };
          fetch("http://localhost:8080/api/Membre/Modify/User", options)
            .then((res) => {
              if (!res.ok) {
                throw new Error("HTTP status " + res.status);
              }
              alert("Modification successfull !");
              window.history.back();
            })
            .catch((e) => {
              alert("Modification invalid credentials !");
            });
        }
      }
    }
  };

  React.useEffect(() => {
    const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
    if (user == null) {
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      };
      fetch("http://localhost:8080/api/Membre/User/Retrieve", options)
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch((e) => {
          console.log("User exception thrown");
        });
    }
  }, []);

  return user == null ? (
    <></>
  ) : (
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
              Modifier
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
                    name="prenom"
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    id="prenom"
                    label="Prenom"
                    autoFocus
                    defaultValue={user.prenom}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    id="nom"
                    label="Nom"
                    name="nom"
                    defaultValue={user.nom}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    name="password"
                    label="Nouveau Password"
                    type="text"
                    id="password"
                    autoComplete="false"
                    inputProps={{ style: { WebkitTextSecurity: "disc" } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Confirmez Nouveau password"
                    type="text"
                    inputProps={{ style: { WebkitTextSecurity: "disc" } }}
                    onChange={(e) => {
                      setConfirmedPassword(e.target.value);
                    }}
                    value={confirmedPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Date de naissance"
                    type="date"
                    name="dateNaissance"
                    InputLabelProps={{ shrink: true }}
                    defaultValue={user.dateNaissance}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RadioGroup name="sexe" defaultValue={user.sexe}>
                    <FormControlLabel
                      value="F"
                      control={<Radio />}
                      label="Femme"
                    />
                    <FormControlLabel
                      value="H"
                      control={<Radio />}
                      label="Homme"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>

              <RadioGroup></RadioGroup>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Modifier
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
