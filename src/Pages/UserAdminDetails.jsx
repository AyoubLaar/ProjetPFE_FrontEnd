import * as React from "react";
import { Box, Tab, Paper, Typography, Button } from "@mui/material";
import { TabContext, TabPanel, TabList, Rating } from "@mui/lab";
import Header from "../components/Header";
import AccountDetailsAdmin from "../components/AccountDetailsAdmin";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Profile() {
  const idUser = React.useRef(useParams().id);
  const [userData, setUserData] = React.useState(null);
  const [value, setValue] = React.useState("1");

  const toggleAnonce = (id) => {
    const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + jwt,
      },
    };
    fetch("http://localhost:8080/api/Admin/Anonce/toggle?id=" + id, options)
      .then((res) => {
        if (!res.ok) throw new Error();
        let anonces = userData.anonces;
        anonces = anonces.map((anonce) => {
          if (anonce.idAnonce === id) {
            if (anonce.status === "enabled") {
              return { ...anonce, status: "adminDisabled" };
            }
            if (anonce.status === "userDisabled") {
              return { ...anonce, status: "userAdminDisabled" };
            }
            if (anonce.status === "userAdminDisabled") {
              return { ...anonce, status: "userDisabled" };
            }
            if (anonce.status === "adminDisabled") {
              return { ...anonce, status: "enabled" };
            }
          } else {
            return anonce;
          }
        });
        setUserData({ ...userData, anonces });
      })
      .catch((e) => {
        alert("Error toggling !");
      });
  };

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
      fetch(
        "http://localhost:8080/api/Admin/User?id=" + idUser.current,
        options
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setUserData(data);
        })
        .catch((e) => {
          console.log("User exception thrown");
        });
    }
  }, []);

  return userData == null ? (
    <></>
  ) : (
    <>
      <Header />
      <Paper sx={{ typography: "body1", margin: "30px" }} elevation={10}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Details du compte" value="1" />
              {userData.reservations == null ||
              userData.reservations.length == 0 ? (
                []
              ) : (
                <Tab label="Reservations" value="2" />
              )}
              {userData.anonces == null || userData.anonces.length == 0 ? (
                []
              ) : (
                <Tab label="Anonces" value="3" />
              )}
            </TabList>
          </Box>
          <TabPanel value="1">
            <AccountDetailsAdmin
              Data={{
                id: userData.idUser,
                status: userData.status,
                prenom: userData.prenom,
                nom: userData.nom,
                email: userData.email,
                sexe: userData.sexe,
                dateNaissance: userData.dateNaissance,
                dateCreation: userData.dateCreation,
              }}
              setData={setUserData}
              userData={userData}
            />
          </TabPanel>
          {userData.reservations == null ||
          userData.reservations.length == 0 ? (
            []
          ) : (
            <TabPanel sx={{ overflowX: "auto" }} value="2">
              <Table
                aria-label="simple table"
                sx={{ width: "100%", overflow: "hidden" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography>Membre</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Email</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Telephone</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Date Arrive</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Date depart</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Enfants</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Adultes</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Etat</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Etoiles</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData.reservations.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Typography>
                          <a href={"/admin/anonce/" + row.idAnonce}>
                            {row.idAnonce}
                          </a>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.email || "-"}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.telephone || "-"}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.dateArrive}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.dateDepart}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.enfants}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.adultes}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color={
                            row.status == "cancelled" || row.status == "refused"
                              ? "error"
                              : "primary"
                          }
                        >
                          {row.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          <Rating readOnly value={row.etoiles || 0} />
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabPanel>
          )}
          {userData.anonces == null || userData.anonces.length == 0 ? (
            []
          ) : (
            <TabPanel value="3">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography>id</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Nom</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>type</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Ville</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Prix</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Date creation</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Status</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Toggle status</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData.anonces.map((row) => (
                    <TableRow
                      key={row.idAnonce}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <a
                          href={"/admin/anonce/" + row.idAnonce}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography>{row.idAnonce}</Typography>
                        </a>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography>{row.nom}</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography>{row.type}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.ville}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.prix}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {new Date(row.dateCreation).getUTCDate() +
                            "/" +
                            (new Date(row.dateCreation).getUTCMonth() + 1) +
                            "/" +
                            new Date(row.dateCreation).getUTCFullYear() +
                            "  " +
                            `${new Date(
                              row.dateCreation
                            ).getUTCHours()}:${new Date(
                              row.dateCreation
                            ).getUTCMinutes()}:${new Date(
                              row.dateCreation
                            ).getUTCSeconds()}`}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color={row.status == "enabled" ? "primary" : "error"}
                        >
                          {row.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => toggleAnonce(row.idAnonce)}>
                          <Typography>{"Toggle"}</Typography>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabPanel>
          )}
        </TabContext>
      </Paper>
    </>
  );
}
