import React from "react";
import { Stack, Button, Typography, TextField } from "@mui/material";

const AccountDetails = ({ Data }) => {
  console.log(Data);
  return Data != null ? (
    <Stack direction="column" gap={2}>
      <Stack alignItems="end">
        <Button href="/modifier/user" variant="contained">
          <Typography>Modifier</Typography>
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
                {Data[key] || "Modify to fill this field"}
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

export default AccountDetails;
