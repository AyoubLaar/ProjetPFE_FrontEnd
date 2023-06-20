import Header from "../components/Header";
import AnonceFilter from "../components/AnonceFilter";
import React from "react";
import Box from "@mui/material/Box";
import Carte from "../components/Carte";
import List from "../components/List";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/joy";

const Search = () => {
  const [id_anonce_chosen, setIdAnonce] = React.useState(
    useParams().id || null
  );
  const [Anonces, setAnonces] = React.useState(null);
  const [isList, setisList] = React.useState(id_anonce_chosen == null);

  React.useEffect(() => {
    if (Anonces == null) {
      fetch("http://localhost:8080/api/Search")
        .then((res) => res.json())
        .then((data) => {
          if (data.length != 0) setAnonces(data);
        });
    }
  });

  return (
    <>
      <Box position="sticky" sx={{ top: 0, right: 0, left: 0, zIndex: 1000 }}>
        <Header />
        {
          <AnonceFilter
            isList={isList}
            setisList={setisList}
            setAnonces={setAnonces}
          />
        }
      </Box>
      {Anonces != null && Anonces.length != 0 ? (
        !isList ? (
          <Carte
            idChosen={id_anonce_chosen}
            setIdAnonce={setIdAnonce}
            anonces={Anonces}
          />
        ) : (
          <List anonces={Anonces} />
        )
      ) : (
        <span style={{ margin: "auto", fontSize: "18px" }}>
          Aucune anonce trouvé
        </span>
      )}
    </>
  );
};

export default Search;
