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
import Rating from "@mui/material/Rating";

const Reserver = () => {
  const [disabled, setDisabled] = React.useState(false);
  const [evaluation, setEvaluation] = React.useState("");
  const [value, setValue] = React.useState(5);
  const id = useParams().id;

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisabled(true);
    if (evaluation == "") {
      alert("Veuillez remplire l'evaluation !");
      setDisabled(false);
    } else {
      const token = window.localStorage.getItem("ESTATE_HUB_JWT");
      const data = {
        evaluation: evaluation,
        nbretoiles: value,
      };
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      console.log(data);
      fetch("http://localhost:8080/api/Membre/evaluer?id=" + id, options)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP status " + res.status);
          }
          alert("Evaluation effectué avec succés");
          window.location.assign("/");
        })
        .catch((e) => {
          alert("Evaluation invalide !");
          window.location.assign("/profile");
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
              Evaluer
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Rating
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={evaluation}
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    onChange={(e) => {
                      if (e.target.value.length <= 48 * 10)
                        setEvaluation(e.target.value);
                    }}
                    label="Description"
                    name="description"
                    multiline
                    maxRows={10}
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
                EVALUER
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
