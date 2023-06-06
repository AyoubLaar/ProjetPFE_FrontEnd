import React from "react";
import { useNavigate } from "react-router-dom";

const RequireAuthentication = ({ children }) => {
  const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
  const [Authentified, setAuthentified] = React.useState(null);
  const Navigate = useNavigate();

  if (jwt == null && Authentified == null) setAuthentified(false);

  if (jwt != null && Authentified == null) {
    fetch("http://localhost:8080/api/Auth/VerifyToken", {
      headers: { Authorization: "Bearer " + jwt },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP status " + res.status);
        } else {
          setAuthentified(true);
        }
      })
      .catch((e) => {
        window.localStorage.removeItem("ESTATE_HUB_JWT");
        setAuthentified(false);
      });
  }

  React.useEffect(() => {
    if (Authentified == false) {
      Navigate("/login");
    }
  }, [Authentified]);

  return Authentified == null ? <></> : Authentified ? children : <></>;
};

export default RequireAuthentication;
