import React from "react";

const RenderIfNotConnected = ({ children }) => {
  const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
  const [Authentified, setAuthentified] = React.useState(true);

  if (jwt != null) {
    fetch("http://localhost:8080/api/Auth/VerifyToken", {
      headers: { Authorization: "Bearer " + jwt },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP status " + res.status);
        } else {
          setAuthentified(false);
        }
      })
      .catch((e) => {
        window.localStorage.removeItem("ESTATE_HUB_JWT");
        setAuthentified(true);
      });
  }

  return Authentified ? children : <></>;
};

export default RenderIfNotConnected;
