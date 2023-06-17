import * as React from "react";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import Header from "../components/Header";
import Reservations from "../components/Reservations";
import AccountDetails from "../components/AccountDetails";

export default function Profile() {
  const [reservations, setReservations] = React.useState(null);
  const [Anonces, setAnonces] = React.useState(null);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    if (reservations == null) {
      const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      };
      fetch("http://localhost:8080/api/Membre/Reservations", options)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP status " + res.status);
          }
          return res.json();
        })
        .then((data) => {
          setReservations(data);
        })
        .catch((e) => {
          console.log("exception thrown!");
        });
    }

    if (Anonces == null) {
      const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      };
      fetch("http://localhost:8080/api/Membre/Anonces", options)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP status " + res.status);
          }
          return res.json();
        })
        .then((data) => {
          setAnonces(data);
        })
        .catch((e) => {
          console.log("exception thrown!");
        });
    }
  }, []);

  return (
    <>
      <Header />
      <Paper sx={{ typography: "body1", margin: "30px" }} elevation={10}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Details du compte" value="1" />
              {reservations == null || reservations.length == 0 ? (
                []
              ) : (
                <Tab label="Reservations" value="2" />
              )}
              {Anonces == null || Anonces.length == 0 ? (
                []
              ) : (
                <Tab label="Anonces" value="3" />
              )}
            </TabList>
          </Box>
          <TabPanel value="1">
            <AccountDetails />
          </TabPanel>
          {reservations == null || reservations.length == 0 ? (
            []
          ) : (
            <TabPanel sx={{ overflowX: "auto" }} value="2">
              <Reservations
                reservations={reservations}
                setReservations={setReservations}
              />
            </TabPanel>
          )}
          {Anonces == null || Anonces.length == 0 ? (
            []
          ) : (
            <TabPanel value="3">Item Three</TabPanel>
          )}
        </TabContext>
      </Paper>
    </>
  );
}
