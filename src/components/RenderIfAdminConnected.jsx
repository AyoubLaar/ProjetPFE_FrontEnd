import React from "react";

const RenderIfAdminConnected = ({ children }) => {
  const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
  const [Authentified, setAuthentified] = React.useState(null);

  if (jwt == null && Authentified == null) setAuthentified(false);

  if (jwt != null && Authentified == null) {
    fetch("http://localhost:8080/api/Auth/VerifyTokenAdmin", {
      headers: new Headers({
        Authorization: "Bearer " + jwt,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP status " + res.status);
        } else {
          setAuthentified(true);
        }
      })
      .catch((e) => {
        setAuthentified(false);
      });
  }

  return Authentified == null ? <></> : Authentified ? children : <></>;
};

export default RenderIfAdminConnected;
