import React from "react";
import { Stack, Button, Typography, TextField } from "@mui/material";

const AccountDetails = () => {
  const [isModifying, setIsModifying] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [modifiedUserData, setModifiedUserData] = React.useState(null);
  const jwt = React.useRef(window.localStorage.getItem("ESTATE_HUB_JWT"));
  React.useEffect(() => {
    if (userData == null) {
      const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      };
      fetch("http://localhost:8080/api/Membre/UserData", options)
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((data) => {
          setUserData(data);
          setModifiedUserData(data);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(new FormData(e.target));
  };

  return isModifying ? (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Stack direction="column">
        <Stack alignItems="end">
          <Button variant="contained" type="submit">
            <Typography>Confirmer</Typography>
          </Button>
        </Stack>

        {userData != null ? (
          Object.keys(userData).map((key) => {
            return (
              <>
                <Typography>{("new " + key).toUpperCase()}</Typography>
                <TextField
                  type="text"
                  value={userData[key] || "undefined"}
                  name={key}
                  variant="outlined"
                />
              </>
            );
          })
        ) : (
          <></>
        )}
      </Stack>
    </form>
  ) : (
    <Stack direction="column">
      <Stack alignItems="end">
        <Button
          onClick={() => {
            setIsModifying(true);
          }}
          variant="contained"
        >
          <Typography>Modifier</Typography>
        </Button>
      </Stack>

      {userData != null ? (
        Object.keys(userData).map((key) => {
          return (
            <>
              <Typography>{key.toUpperCase() + ":"}</Typography>
              <Typography margin={2}>{userData[key] || "undefined"}</Typography>
            </>
          );
        })
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default AccountDetails;
