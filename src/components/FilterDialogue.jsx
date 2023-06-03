const FilterDialogue = ({ open, handleCloseCancel }) => {
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
      <DialogTitle sx={{ padding: 0, paddingTop: "20px", marginBottom: "0px" }}>
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
  </Dialog>;
};

export default FilterDialogue;
