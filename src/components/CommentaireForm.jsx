import { Stack, TextField, Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const CommentaireForm = () => {
  const idAnonce = useParams().id;
  const [show, setShow] = React.useState(false);
  const [comment, setComment] = React.useState("");
  return (
    <Stack direction={"column"} gap={3} alignItems={"end"} padding={1}>
      <TextField
        fullWidth
        multiline
        variant="standard"
        placeholder="add comment ..."
        value={comment}
        onChange={(e) => {
          if (e.target.value.length <= 255) setComment(e.target.value);
        }}
        onClick={() => {
          const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
          console.log(jwt);
          if (jwt == null) {
            setShow(false);
            window.location.assign("/login");
          }

          if (jwt != null) {
            fetch("http://localhost:8080/api/Auth/VerifyToken", {
              headers: { Authorization: "Bearer " + jwt },
            })
              .then((res) => {
                if (!res.ok) {
                  throw new Error("HTTP status " + res.status);
                } else {
                  setShow(true);
                }
              })
              .catch((e) => {
                setShow(false);
                window.location.assign("/login");
              });
          }
        }}
      />
      {show ? (
        <Stack direction={"row"} gap={1}>
          <Button
            variant="outlined"
            color="error"
            sx={{ height: "fit-content" }}
            onClick={() => {
              setComment("");
              setShow(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              const commentaire_dto = {
                idAnonce: idAnonce,
                text: comment,
              };
              const token = window.localStorage.getItem("ESTATE_HUB_JWT");
              const options = {
                method: "POST",
                mode: "cors",
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(commentaire_dto),
              };
              fetch("http://localhost:8080/api/Membre/Commenter", options)
                .then((res) => {
                  if (!res.ok) {
                    throw new Error("HTTP status " + res.status);
                  }
                  window.location.reload();
                })
                .catch(() => {
                  setComment("");
                });
            }}
            sx={{ height: "fit-content" }}
          >
            Publier
          </Button>
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default CommentaireForm;
3;
