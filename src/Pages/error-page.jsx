import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function ErrorPage() {
  return (
    <>
      <Header />
      <Box sx={{ padding: "40px" }}>
        <Typography variant="h6" textAlign="center">
          Sorry, an unexpected error has occurred
        </Typography>
        <br />
        <Typography variant="body1" textAlign="center">
          you can click the logo to go back home !
        </Typography>
      </Box>
    </>
  );
}
