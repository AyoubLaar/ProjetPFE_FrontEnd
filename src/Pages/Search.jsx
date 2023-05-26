import Header from "../components/Header";
import AnonceFilter from "../components/AnonceFilter";
import Data_Categories from "../Data/Categories.json";
import React from "react";
import Box from "@mui/material/Box";
import Carte from "../components/Carte";
import List from "../components/List";
import { Context } from "../context/SearchContext";
import { useParams } from "react-router-dom";

const Search = () => {
  const [filter, setfilter] = React.useState({
    minPrix: "",
    maxPrix: "",
    chambres: "",
    salles: "",
    region: "",
    ville: "",
    Categories: Data_Categories.map((categorie) => {
      return {
        id: categorie,
        state: false,
      };
    }),
  });
  const [id_anonce_chosen, setIdAnonce] = React.useState(
    useParams().id || null
  );
  const [Anonces, setAnonces] = React.useState(null);
  const [isList, setisList] = React.useState(id_anonce_chosen == null);

  React.useEffect(() => {
    //fetch(with filter)
    fetch("http://localhost:8080/Anonce")
      .then((res) => res.json())
      .then((data) => console.log(data));
  });

  return (
    <>
      <Box position="sticky" sx={{ top: 0, right: 0, left: 0, zIndex: 1000 }}>
        <Header />
        <AnonceFilter
          setSearchfilter={setfilter}
          Searchfilter={filter}
          isList={isList}
          setisList={setisList}
        />
      </Box>
      <Context.Provider
        value={{ setisList: setisList, setIdAnonce: setIdAnonce }}
      >
        {!isList ? (
          <Carte
            idChosen={id_anonce_chosen}
            setIdAnonce={setIdAnonce}
            anonces={Anonces}
          />
        ) : (
          <List anonces={Anonces} />
        )}
      </Context.Provider>
    </>
  );
};

export default Search;
