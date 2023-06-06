import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import { Paper, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function SignUp() {
  const [confirmedPassword, setConfirmedPassword] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (
      formData.get("nom") == null ||
      formData.get("prenom") == null ||
      formData.get("dateNaissance") == "" ||
      formData.get("password") == null ||
      formData.get("email") == null ||
      formData.get("sexe") == null
    ) {
      alert("Veuillez remplir tout les champs !");
    } else {
      if (formData.get("password") !== confirmedPassword) {
        alert("Passwords mismatch !");
      } else {
        const Data = {
          nom: formData.get("nom"),
          prenom: formData.get("prenom"),
          dateNaissance: formData.get("dateNaissance"),
          password: formData.get("password"),
          email: formData.get("email"),
          sexe: formData.get("sexe"),
        };
        const options = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        };
        fetch("http://localhost:8080/api/Auth/register", options)
          .then((res) => {
            if (!res.ok) {
              console.log("authenticate res not ok !");
              throw new Error("HTTP status " + res.status);
            }
            return res.json();
          })
          .then((data) => {
            window.localStorage.removeItem("ESTATE_HUB_JWT");
            window.localStorage.setItem("ESTATE_HUB_JWT", data.token);
            window.location.assign("/");
          })
          .catch((e) => {
            console.log("invalid credentials !");
          });
      }
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
              Sign up
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    id="email"
                    label="Email"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Confirmez password"
                    type="password"
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <RadioGroup name="sexe">
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
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
