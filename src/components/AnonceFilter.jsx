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

export default function AnonceFilter({ Searchfilter, setSearchfilter }) {
  const [Categories, setCategories] = React.useState(Searchfilter.Categories);
  const [isList, setisList] = React.useState(true);

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
    });
  };

  const [minPrix, setMinPrix] = React.useState(Searchfilter.minPrix);
  const [maxPrix, setMaxPrix] = React.useState(Searchfilter.maxPrix);
  const [chambres, setChambres] = React.useState(Searchfilter.chambres);
  const [salles, setSalles] = React.useState(Searchfilter.salles);

  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          flexWrap: "wrap",
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
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            padding: "0",
          },
        }}
      >
        <DialogContent>
          <DialogTitle sx={{ padding: 0, paddingTop: "20px", marginBottom: 0 }}>
            Prix
          </DialogTitle>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Min Prix"
            type="email"
            fullWidth
            variant="standard"
            value={minPrix}
            onChange={(e) => setMinPrix(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Max Prix"
            type="email"
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
            id="name"
            label="Chambres"
            type="email"
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
            id="name"
            label="Salles de bain"
            type="email"
            fullWidth
            variant="standard"
            value={salles}
            onChange={(e) => setSalles(e.target.value)}
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
            variant="contained"
            color="error"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCloseFilter}
            variant="contained"
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
