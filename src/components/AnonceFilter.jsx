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

export default function AnonceFilter({ setisList, isList, setAnonces }) {
  const villes = React.useRef(null);
  //filter values
  const [categories, setCategories] = React.useState(null);
  const [minPrix, setMinPrix] = React.useState(0);
  const [maxPrix, setMaxPrix] = React.useState(0);
  const [chambres, setChambres] = React.useState(0);
  const [salles, setSalles] = React.useState(0);
  const [ville, setVille] = React.useState("");
  //Form values
  const [form_categories, setForm_Categories] = React.useState([]);
  const [form_minPrix, setForm_MinPrix] = React.useState(0);
  const [form_maxPrix, setForm_MaxPrix] = React.useState(0);
  const [form_chambres, setForm_Chambres] = React.useState(0);
  const [form_salles, setForm_Salles] = React.useState(0);
  const [form_ville, setForm_Ville] = React.useState("");
  //Dialogue state
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (categories == null) {
      fetch("http://localhost:8080/api/Search/categories")
        .then((res) => res.json())
        .then((data) => {
          const newData = data.map((ville) => {
            return { id: ville, state: false };
          });
          console.log(
            "data 0 : " +
              newData[0].id +
              " " +
              newData[0].state +
              " data 1 " +
              newData[1]
          );
          setCategories(newData);
        });
    }

    if (villes.current == null) {
      fetch("http://localhost:8080/api/Search/villes")
        .then((res) => res.json())
        .then((data) => (villes.current = data));
    }
  }, []);

  React.useEffect(() => {
    setForm_Categories(categories);
  }, [categories]);

  const setCategorie = (id) => {
    setForm_Categories(
      form_categories.map((Categorie) =>
        Categorie.id == id
          ? { id: Categorie.id, state: !Categorie.state }
          : Categorie
      )
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const init = () => {
    setForm_Categories(categories);
    setForm_MinPrix(minPrix);
    setForm_MaxPrix(maxPrix);
    setForm_Chambres(chambres);
    setForm_Salles(salles);
    setForm_Ville(ville);
  };

  const handleCloseCancel = () => {
    setOpen(false);
    init();
  };

  const handleCloseFilter = () => {
    setOpen(false);
    handleClose();
    setCategories(form_categories);
    setMinPrix(form_minPrix);
    setMaxPrix(form_maxPrix);
    setChambres(form_chambres);
    setSalles(form_salles);
    setVille(form_ville);
    const categoriesArray = categories.map((categorie) => categorie.id);
    fetch("http://localhost:8080/api/Search/filter", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        minPrix: minPrix,
        maxPrix: maxPrix,
        chambres: chambres,
        salles: salles,
        categories: categoriesArray,
        ville: ville,
      }),
    })
      .then((res) => res.json())
      .then((data) => setAnonces(data));
  };

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
      <Dialog open={open} onClose={handleCloseCancel} scroll="body">
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
            value={form_minPrix}
            onChange={(e) => {
              setForm_MinPrix(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Max Prix"
            type="number"
            fullWidth
            variant="standard"
            value={form_maxPrix}
            onChange={(e) => setForm_MaxPrix(e.target.value)}
            onBlur={() => {
              if (maxPrix < minPrix) setForm_MaxPrix(parseInt(minPrix) + 1);
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
            value={form_chambres}
            onChange={(e) => setForm_Chambres(e.target.value)}
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
            value={form_salles}
            onChange={(e) => setForm_Salles(e.target.value)}
          />
          <DialogTitle sx={{ padding: 0, paddingTop: "20px", marginBottom: 0 }}>
            Ville
          </DialogTitle>
          <Autocomplete
            options={villes.current}
            freeSolo
            inputValue={form_ville}
            onInputChange={(event, newInputValue) => {
              setForm_Ville(newInputValue);
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
            {form_categories != null ? (
              form_categories.map((categorie) => {
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
              })
            ) : (
              <></>
            )}
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
