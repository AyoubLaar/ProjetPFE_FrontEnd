import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import Box from "@mui/material/Box";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import Toolbar from "@mui/material/Toolbar";
import ListIcon from "@mui/icons-material/List";
import { Autocomplete } from "@mui/material";
import villesRegions from "../Data/villes.json";

export default function AnonceFilter({
  Searchfilter,
  setSearchfilter,
  setisList,
  isList,
}) {
  const [Categories, setCategories] = React.useState(Searchfilter.Categories);
  const villes = villesRegions.map((villeRegion) => villeRegion[0]);
  const regions = Array.from(
    new Set(villesRegions.map((villeRegion) => villeRegion[1]))
  );

  const setCategorie = (id) => {
    setCategories(
      Categories.map((Categorie) =>
        Categorie.id == id
          ? { id: Categorie.id, state: !Categorie.state }
          : Categorie
      )
    );
  };
  const init = () => {
    setCategories(Searchfilter.Categories);
    setMinPrix(Searchfilter.minPrix);
    setMaxPrix(Searchfilter.maxPrix);
    setChambres(Searchfilter.chambres);
    setSalles(Searchfilter.salles);
    setVille(Searchfilter.ville);
    setRegion(Searchfilter.region);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseCancel = () => {
    setOpen(false);
    init();
  };

  const handleCloseFilter = () => {
    setOpen(false);
    handleClose();
    setSearchfilter({
      minPrix: minPrix,
      maxPrix: maxPrix,
      chambres: chambres,
      salles: salles,
      Categories: Categories,
      region: region,
      ville: ville,
    });
    console.log("filter set !");
  };

  const [minPrix, setMinPrix] = React.useState(Searchfilter.minPrix);
  const [maxPrix, setMaxPrix] = React.useState(Searchfilter.maxPrix);
  const [chambres, setChambres] = React.useState(Searchfilter.chambres);
  const [salles, setSalles] = React.useState(Searchfilter.salles);
  const [ville, setVille] = React.useState(Searchfilter.ville);
  const [region, setRegion] = React.useState(Searchfilter.region);

  return (
    <>
      <Toolbar
        sx={{
          zIndex: "1",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "10px",
          paddingTop: "0",
          paddingBottom: "0",
          flexWrap: "wrap",
          backgroundColor: "white",
        }}
      >
        <Button
          startIcon={<TuneOutlinedIcon />}
          variant="outlined"
          color="Black"
          size="medium"
          onClick={handleClickOpen}
          sx={{ minWidth: "fit-content", maxHeight: "31px" }}
        >
          Filter
        </Button>
        <Button
          startIcon={
            isList ? <FmdGoodRoundedIcon color="error" /> : <ListIcon />
          }
          variant="outlined"
          color="Black"
          size="medium"
          sx={{ minWidth: "fit-content", maxHeight: "31px" }}
          onClick={() => {
            setisList(!isList);
          }}
        >
          {isList ? "Map" : "List"}
        </Button>
      </Toolbar>
      <Dialog open={open} onClose={handleClose} scroll="body">
        <DialogContent>
          <DialogTitle sx={{ padding: 0, paddingTop: "0", marginBottom: 0 }}>
            Prix
          </DialogTitle>
          <TextField
            autoFocus
            margin="dense"
            label="Min Prix"
            type="number"
            fullWidth
            variant="standard"
            value={minPrix}
            onChange={(e) => {
              setMinPrix(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Max Prix"
            type="number"
            fullWidth
            variant="standard"
            value={maxPrix}
            onChange={(e) => setMaxPrix(e.target.value)}
            onBlur={() => {
              if (maxPrix < minPrix) setMaxPrix(parseInt(minPrix) + 1);
            }}
          />
          <DialogTitle sx={{ padding: 0, paddingTop: "20px", marginBottom: 0 }}>
            Chambres
          </DialogTitle>
          <TextField
            autoFocus
            margin="dense"
            label="Chambres"
            type="number"
            fullWidth
            variant="standard"
            value={chambres}
            onChange={(e) => setChambres(e.target.value)}
          />
          <DialogTitle sx={{ padding: 0, paddingTop: "20px", marginBottom: 0 }}>
            Salles de bain
          </DialogTitle>
          <TextField
            autoFocus
            margin="dense"
            label="Salles de bain"
            type="number"
            fullWidth
            variant="standard"
            value={salles}
            onChange={(e) => setSalles(e.target.value)}
          />
          <DialogTitle sx={{ padding: 0, paddingTop: "20px", marginBottom: 0 }}>
            Region
          </DialogTitle>
          <Autocomplete
            options={regions}
            freeSolo
            inputValue={region}
            onInputChange={(event, newInputValue) => {
              setRegion(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                margin="dense"
                label="Region"
                type="text"
                fullWidth
                variant="standard"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            )}
          />
          <DialogTitle sx={{ padding: 0, paddingTop: "20px", marginBottom: 0 }}>
            Ville
          </DialogTitle>
          <Autocomplete
            options={villes}
            freeSolo
            inputValue={ville}
            onInputChange={(event, newInputValue) => {
              setVille(newInputValue);
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  autoFocus
                  margin="dense"
                  label="Ville"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                />
              );
            }}
          />
          <DialogTitle
            sx={{ padding: 0, paddingTop: "20px", marginBottom: "0px" }}
          >
            Categories
          </DialogTitle>
          <Box
            sx={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              padding: "10px 0",
              gap: "5px",
              rowGap: "10px",
              flexWrap: "wrap",
            }}
          >
            {Categories.map((categorie) => {
              return (
                <Button
                  key={categorie.id}
                  size="small"
                  variant={categorie.state ? "contained" : "outlined"}
                  color={categorie.state ? "secondary" : "Black"}
                  sx={{
                    color: categorie.state ? "white" : "black",
                    margin: "0 10px 0 0 ",
                    minWidth: "fit-content",
                  }}
                  onClick={() => setCategorie(categorie.id)}
                >
                  {categorie.id}
                </Button>
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions sx={{ paddingTop: "40px" }}>
          <Button
            onClick={handleCloseCancel}
            variant="outlined"
            color="error"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCloseFilter}
            variant="outlined"
            color="primary"
            size="small"
          >
            Filter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
