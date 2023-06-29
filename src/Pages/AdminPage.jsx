import React from "react";
import Header from "../components/Header";
import { Box, Tab, Paper, Typography, Button } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const AdminPage = () => {
  const [users, setUsers] = React.useState(null);
  const [anonces, setAnonces] = React.useState(null);
  const [value, setValue] = React.useState("1");

  React.useEffect(() => {
    const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
    if (anonces == null) {
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      };
      fetch("http://localhost:8080/api/Admin/Anonces", options)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP status " + res.status);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setAnonces(data);
        })
        .catch((e) => {
          console.log("Anonces exception thrown!");
        });
    }
    if (users == null) {
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      };
      fetch("http://localhost:8080/api/Admin/Users", options)
        .then((res) => {
          if (!res.ok) {
            throw new Error("HTTP status " + res.status);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setUsers(data);
        })
        .catch((e) => {
          console.log("users exception thrown!");
        });
    }
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleUser = (id) => {
    const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + jwt,
      },
    };
    fetch("http://localhost:8080/api/Admin/User/toggle?id=" + id, options)
      .then((res) => {
        if (!res.ok) throw new Error();
        setUsers(
          users.map((user) => {
            if (user.id === id) {
              if (user.status === "enabled") {
                return { ...user, status: "adminDisabled" };
              }
              if (user.status === "adminDisabled") {
                return { ...user, status: "enabled" };
              }
            } else {
              return user;
            }
          })
        );
      })
      .catch((e) => {
        alert("Error toggling !");
      });
  };

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
        setAnonces(
          anonces.map((anonce) => {
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
          })
        );
      })
      .catch((e) => {
        alert("Error toggling !");
      });
  };

  return (
    <>
      <Header />
      <Paper sx={{ typography: "body1", margin: "30px" }} elevation={10}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {anonces == null || anonces.length == 0 ? (
                []
              ) : (
                <Tab label={`Anonces (${anonces.length})`} value="1" />
              )}
              {users == null || users.length == 0 ? (
                []
              ) : (
                <Tab label={`Users (${users.length})`} value="2" />
              )}
            </TabList>
          </Box>
          <Box overflow="auto">
            {anonces == null || anonces.length == 0 ? (
              []
            ) : (
              <TabPanel value="1">
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
                    {anonces.map((row) => (
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
                          <Typography>{row.nomAnonce}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Typography>{row.type}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{row.idVille}</Typography>
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
                            color={
                              row.status == "enabled" ? "primary" : "error"
                            }
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
            {users == null || users.length == 0 ? (
              <></>
            ) : (
              <TabPanel value="2">
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
                        <Typography>Prenom</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Email</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Creation du compte</Typography>
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
                    {users.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <a
                            href={"/admin/user/" + row.id}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography>{row.id}</Typography>
                          </a>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Typography>{row.nom}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{row.prenom}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{row.email}</Typography>
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
                            color={
                              row.status == "enabled" ? "primary" : "error"
                            }
                          >
                            {row.status}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => toggleUser(row.id)}>
                            <Typography>{"Toggle "}</Typography>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabPanel>
            )}
          </Box>
        </TabContext>
      </Paper>
    </>
  );
};

export default AdminPage;
