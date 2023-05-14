import Header from "../components/Header";
import AnonceFilter from "../components/AnonceFilter";
import Data_Categories from "../Data/Categories.json";
import React from "react";
import Box from "@mui/material/Box";

const Search = () => {
  const [filter, setfilter] = React.useState({
    minPrix: "",
    maxPrix: "",
    chambres: "",
    salles: "",
    Categories: Data_Categories.map((categorie) => {
      return {
        id: categorie,
        state: false,
      };
    }),
  });

  return (
    <>
      <Box position="fixed" sx={{ top: 0, right: 0, left: 0 }}>
        <Header />
        <AnonceFilter setSearchfilter={setfilter} Searchfilter={filter} />
      </Box>
    </>
  );
};

export default Search;
