import { userContext } from "../context/UserContext";
import React from "react";

const Session = ({ children }) => {
  const [jwt, setJwt] = React.useState(null);
  return (
    <userContext.Provider value={[jwt, setJwt]}>
      {children}
    </userContext.Provider>
  );
};

export default Session;
