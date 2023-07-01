import React from "react";
import { Stack, Button, Typography, TextField } from "@mui/material";

const AccountDetailsAdmin = ({ Data, userData, setData }) => {
  const [confirmed, setConfirmed] = React.useState(false);

  const toggle = () => {
    const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + jwt,
      },
    };
    fetch("http://localhost:8080/api/Admin/User/toggle?id=" + Data.id, options)
      .then((res) => {
        if (!res.ok) throw new Error();
        let A = userData.anonces;
        if (userData.status == "adminDisabled") {
          for (let i = 0; i < A.length; i++) {
            if (A[i].status != "adminDisabled") A[i].status = "enabled";
          }
          setData({ ...userData, status: "enabled", anonces: A });
        }
        if (userData.status == "enabled") {
          for (let i = 0; i < A.length; i++) {
            if (A[i].status != "adminDisabled")
              A[i].status = "DisabledWithUser";
          }
          setData({ ...userData, status: "adminDisabled", anonces: A });
        }
      })
      .catch((e) => {
        console.error(e);
        alert("Error toggling!");
      });
  };

  const supprimer = () => {
    if (confirmed) {
      const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      };
      fetch(
        "http://localhost:8080/api/Admin/User/supprimer?id=" + Data.id,
        options
      )
        .then((res) => {
          if (!res.ok) throw new Error();
          setData({ ...userData, status: "adminRemoved" });
        })
        .catch((e) => {
          alert("Error toggling!");
        });
    } else {
      setConfirmed(true);
    }
  };

  return Data != null ? (
    <Stack direction="column" gap={2}>
      <Stack direction="row" justifyContent="end" gap={3}>
        <Button
          onClick={() => {
            supprimer();
          }}
          variant="contained"
          color="error"
          disabled={Data.status == "removed" || Data.status == "adminRemoved"}
        >
          <Typography>{confirmed ? "confirmer" : "supprimer"}</Typography>
        </Button>
        <Button
          onClick={() => {
            toggle();
          }}
          variant="contained"
        >
          <Typography>Toggle</Typography>
        </Button>
      </Stack>
      {Data != null ? (
        Object.keys(Data).map((key) => {
          return (
            <Stack direction={"row"} gap={1}>
              <Typography
                color={"primary"}
                sx={{
                  overflowWrap: "break-word",
                }}
              >
                {key.toUpperCase() + "  :"}
              </Typography>
              <Typography
                color={Data[key] ? "" : "error"}
                sx={{
                  overflowWrap: "break-word",
                }}
              >
                {Data[key] || "undefined"}
              </Typography>
            </Stack>
          );
        })
      ) : (
        <></>
      )}
    </Stack>
  ) : (
    <></>
  );
};

export default AccountDetailsAdmin;
