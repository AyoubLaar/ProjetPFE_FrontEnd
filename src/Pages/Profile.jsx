import * as React from "react";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import Header from "../components/Header";
import Reservations from "../components/Reservations";
import ListAnonceProprietaire from "../components/ListAnonceProprietaire";
import AccountDetails from "../components/AccountDetails";

export default function Profile() {
  const [userData, setUserData] = React.useState(null);
  const [reservations, setReservations] = React.useState(null);
  const [Anonces, setAnonces] = React.useState(null);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
    if (userData == null) {
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
          setUserData(data);
        })
        .catch((e) => {
          console.log("User exception thrown");
        });
    }
    if (reservations == null) {
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
          console.log("Reservations exception thrown!");
        });
    }

    if (Anonces == null) {
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
          console.log("Anonces exception thrown!");
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
            <AccountDetails Data={userData} />
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
            <TabPanel value="3">
              <ListAnonceProprietaire anonces={Anonces} />;
            </TabPanel>
          )}
        </TabContext>
      </Paper>
    </>
  );
}
