import React from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";

const RequireAuthentication = ({ children }) => {
  const [Authentified, setAuthentified] = React.useState(false);
  const [jwt] = React.useContext(userContext);
  const Navigate = useNavigate();
  React.useEffect(() => {
    if (jwt == null) {
      Navigate("/login");
    } else {
      fetch("http://localhost:8080/api/Auth/VerifyToken", {
        method: "POST",
        body: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjg1NjIwOTY4LCJleHAiOjE2ODU2Mjk2MDh9.v4nQUk81wNxtDLMp_O0QLA8yEDRzWXJzQrss_xvR0RE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            setAuthentified(true);
          } else {
            Navigate("/login");
          }
        });
    }
  }, []);
  return !Authentified ? <></> : children;
};

export default RequireAuthentication;
