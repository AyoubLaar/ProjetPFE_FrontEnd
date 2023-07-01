import Header from "../components/Header";
import {
  Paper,
  TextField,
  Typography,
  Stack,
  Button,
  Link,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [jwt, setJwt] = React.useState(
    window.localStorage.getItem("ESTATE_HUB_JWT")
  );
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authentified, setAuthentified] = React.useState(null);
  const Navigate = useNavigate();

  React.useEffect(() => {
    if (authentified == true) Navigate(-1);
  }, [authentified]);

  if (jwt == null && authentified == null) setAuthentified(false);

  if (jwt != null && authentified == null) {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
      },
    };
    fetch("http://localhost:8080/api/Auth/VerifyToken", options)
      .then((res) => {
        if (!res.ok) {
          console.log("VerifyToken res not ok !");
          throw new Error("HTTP status " + res.status);
        } else {
          setAuthentified(true);
        }
      })
      .catch((e) => {
        setAuthentified(false);
        setJwt(null);
        console.log("LocalStorage jwt not valide !");
        window.localStorage.removeItem("ESTATE_HUB_JWT");
      });
  }

  const onclick = () => {
    if (jwt == null && !authentified) {
      fetch("http://localhost:8080/api/Auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            console.log("authenticate res not ok !");
            throw new Error("HTTP status " + res.status);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          window.localStorage.setItem("ESTATE_HUB_JWT", data.token);
          setAuthentified(true);
          console.log("login successfull !");
        })
        .catch((e) => {
          alert("invalid credentials !");
          setEmail("");
          setPassword("");
        });
    }
  };

  return authentified == null ? (
    <></>
  ) : authentified ? (
    <></>
  ) : (
    <>
      <Header />
      <Stack width={1} direction="column" alignItems="center" paddingTop={10}>
        <Paper sx={{ minWidth: "500px" }} elevation={5}>
          <Stack direction="column" padding={2} gap={2}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onclick}
            >
              Sign In
            </Button>
            <Link href="/SignUp" margin="auto" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default Login;
