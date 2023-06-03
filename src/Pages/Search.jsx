import Header from "../components/Header";
import AnonceFilter from "../components/AnonceFilter";
import React from "react";
import Box from "@mui/material/Box";
import Carte from "../components/Carte";
import List from "../components/List";
import { useParams } from "react-router-dom";

const Search = () => {
  const [id_anonce_chosen, setIdAnonce] = React.useState(
    useParams().id || null
  );
  const [Anonces, setAnonces] = React.useState(null);
  const [isList, setisList] = React.useState(id_anonce_chosen == null);

  React.useEffect(() => {
    console.log("anonces ! " + JSON.stringify(Anonces));
    if (Anonces == null) {
      fetch("http://localhost:8080/api/Search")
        .then((res) => res.json())
        .then((data) => {
          setAnonces(data);
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
      {Anonces != null ? (
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
        <></>
      )}
    </>
  );
};

export default Search;
