import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Autocomplete,
  Paper,
  Typography,
  Stack,
  TextField,
  Box,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  Container,
} from "@mui/material";
import AnonceDetails from "./AnonceDetails";

const Form = () => {
  const jwt = React.useRef(window.localStorage.getItem("ESTATE_HUB_JWT"));
  const [villes, setVilles] = React.useState(null);
  const [regions, setRegions] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [disabled, setDisabled] = React.useState(false);
  const widget = React.useRef();
  const cloudinaryRef = React.useRef();

  const handleDeleteImage = () => {
    console.log("Deleting image !");
    console.log(formData.public_id);
    if (formData.public_id != null) {
      const token = jwt.current;
      fetch(
        "http://localhost:8080/api/Membre/DeleteFile?public_id=" +
          formData.public_id,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((res) => {
          if (!res.ok) throw new Error();
          setFormData({
            ...formData,
            imageUrl: "",
            public_id: null,
            fileName: "",
          });
        })
        .catch((e) => {
          alert("Cannot delete file!");
        });
    }
  };

  React.useEffect(() => {
    document.getElementById("root").style =
      "display: flex;" +
      "flex-direction: column;" +
      "height: 100%;" +
      "width: 100%;";
    if (categories == null) {
      fetch("http://localhost:8080/api/Search/categories")
        .then((res) => res.json())
        .then((data) => {
          const newData = data.map((categorie) => {
            return { id: categorie, state: false };
          });
          setCategories(newData);
        });
    }
    if (villes == null) {
      fetch("http://localhost:8080/api/Search/villes")
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => setVilles(data))
        .catch((e) => {
          console.log(e);
          alert("error connecting to server !");
          window.location.assign("/");
        });
    }
    if (regions == null) {
      fetch("http://localhost:8080/api/Search/regions")
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          setRegions(data);
        })
        .catch((e) => {
          alert("error connecting to server !");
          window.location.assign("/");
        });
    }

    return () => {
      console.log(window.current);
      document.getElementById("root").style = "";
    };
  }, []);

  React.useEffect(() => {
    if (currentStep == 3) {
      if (cloudinaryRef.current == null || widget.current == null) {
        cloudinaryRef.current = window.cloudinary;
        widget.current = cloudinaryRef.current.createUploadWidget(
          {
            cloudName: "drkbf7big",
            uploadPreset: "bfnzqpxh",
          },
          (error, result) => {
            if (!error && result.event === "success") {
              setFormData({
                ...formData,
                public_id: result.info.public_id,
                imageUrl: result.info.secure_url,
                fileName: result.info.original_filename,
              });
            }
          }
        );
      }
    }
  }, [currentStep]);
  //#region
  const [markerPosition, setMarkerPosition] = useState({
    lat: 33.66492,
    lng: -7.817975,
  });

  const [formData, setFormData] = useState({
    type: "",
    latitude: 0,
    longitude: 0,
    prix: 0,
    surface: 0,
    chambres: 0,
    sallesDeBain: 0,
    etages: 0,
    nomAnonce: "",
    description: "",
    imageUrl: "",
    email: "",
    telephone: "",
    ville: "",
    region: "",
    categories: [],
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    console.log(formData);
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = jwt.current;
    const Data = {
      latitude: markerPosition.lat,
      longitude: markerPosition.lng,
      prix: formData.prix,
      surface: formData.surface,
      chambres: formData.chambres,
      sallesDeBain: formData.sallesDeBain,
      etages: formData.etages,
      nomAnonce: formData.nomAnonce,
      description: formData.description,
      imageUrl: formData.imageUrl,
      email: formData.email,
      telephone: formData.telephone,
      ville: formData.ville,
      region: formData.region,
      categories: formData.categories,
      type: formData.type,
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(Data),
    };
    console.log(Data);
    fetch("http://localhost:8080/api/Membre/Publier", options)
      .then((res) => {
        if (!res.ok) throw new Error();
        alert("Publication effectué avec succées");
        window.location.assign("/");
      })
      .catch((e) => {
        alert("Erreur publication");
        // window.location.assign("/");
      });
    /*
    TYPE type,
     float latitude,
     float longitude,
     float prix,
     int surface,
     int chambres,
     int sallesDeBain,
     int etages,
     String nomAnonce,
     String description,
     String imageUrl,
     String email,
     String telephone,
     String ville,
     String region,
     String [] categories
 */
  };

  const validateForm = () => {
    let isValid = true;

    if (currentStep === 1) {
      if (formData.type === "") {
        alert("Anonce Type is required");
        isValid = false;
      }
      if (formData.ville === "") {
        alert("Anonce ville is required");
        isValid = false;
      }
      if (formData.prix < 0) {
        alert("Prix must be a positive number");
        isValid = false;
      }
      if (formData.surface < 0) {
        alert("surface must be a positive number");
        isValid = false;
      }
      if (formData.nbreChambres < 0) {
        alert("Number of bedrooms must be a positive number");
        isValid = false;
      }
      if (formData.nbreSalleBain < 0) {
        alert("Number of bathrooms must be a positive number");
        isValid = false;
      }
      if (formData.nbreEtages < 0) {
        alert("Number floors must be a positive number");
        isValid = false;
      }
      if (formData.region == "") {
        alert("Anonce region is required");
        isValid = false;
      }
      if (formData.email == "") {
        alert("email is required");
        isValid = false;
      }
      if (formData.telephone == "") {
        alert("telephone is required");
        isValid = false;
      }
    }
    if (currentStep === 2) {
      if (formData.nomAnonce === "") {
        errors.nomAnonce = "Anonce name is required";
        isValid = false;
      }
      if (formData.description === "") {
        errors.description = "Anonce description is required";
        isValid = false;
      }
    }
    if (currentStep === 4) {
      if (formData.imageUrl === "") {
        errors.nomAnonce = "image is required";
        isValid = false;
      }
    }
    return isValid;
  };
  //#endregion
  return villes == null || regions == null ? (
    <></>
  ) : currentStep == 1 ? (
    <>
      <div style={{ flex: 1 }}>
        <Paper
          sx={{ margin: "50px  auto", width: "fit-content" }}
          elevation={10}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            padding={2}
          >
            <Container component="main" maxWidth="sm">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                padding={2}
              >
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="prix"
                        required
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.prix}
                        type="number"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        label="Prix"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        type="number"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={formData.surface}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Surface"
                        name="surface"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="chambres"
                        value={formData.chambres}
                        required
                        type="number"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Chambres"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        type="number"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.sallesDeBain}
                        label="Salles de Bain"
                        name="sallesDeBain"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        value={formData.etages}
                        InputLabelProps={{ shrink: true }}
                        type="number"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        label="Etages"
                        name="etages"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        options={villes}
                        freeSolo
                        inputValue={formData.ville}
                        onInputChange={(event, newInputValue) => {
                          setFormData({ ...formData, ville: newInputValue });
                        }}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              required
                              fullWidth
                              value={formData.ville}
                              InputLabelProps={{ shrink: true }}
                              type="text"
                              onChange={(e) => {
                                handleInputChange(e);
                              }}
                              label="Ville"
                              name="ville"
                            />
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete
                        options={regions}
                        freeSolo
                        inputValue={formData.region}
                        onInputChange={(event, newInputValue) => {
                          setFormData({ ...formData, region: newInputValue });
                        }}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              required
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              type="text"
                              label="Region"
                              name="region"
                            />
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        type="email"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={formData.telephone}
                        required
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        type="text"
                        label="Telephone"
                        name="telephone"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RadioGroup
                        name="type"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          onClick={handleInputChange}
                          checked={formData.type == "0"}
                          label="Louer"
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          onClick={handleInputChange}
                          checked={formData.type == "1"}
                          label="acheter"
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </Box>
        </Paper>
      </div>
      <Paper
        elevation={5}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: 1,
        }}
      >
        <Button
          variant="outlined"
          color="error"
          onClick={handlePrevious}
          disabled
        >
          Previous
        </Button>
        <Typography component="h1" variant="h5">
          Step {currentStep} : Details
        </Typography>
        <Button variant="outlined" onClick={handleNext}>
          Next
        </Button>
      </Paper>
    </>
  ) : currentStep == 3 ? (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box width={1} flex={1}>
        <MapContainer
          center={markerPosition}
          zoom={7}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[markerPosition.lat, markerPosition.lng]}
            draggable={true}
            eventHandlers={{
              move: (e) => {
                setMarkerPosition(e.target.getLatLng());
              },
            }}
          ></Marker>
        </MapContainer>
      </Box>
      <Stack flexDirection={"row"} justifyContent="space-between" padding={2}>
        <Button variant="outlined" color="error" onClick={handlePrevious}>
          Previous
        </Button>
        <Typography component="h1" variant="h5">
          Step {currentStep} : Set map location
        </Typography>

        <Button variant="outlined" onClick={handleNext}>
          NEXT
        </Button>
      </Stack>
    </Box>
  ) : currentStep == 2 ? (
    <>
      <div style={{ flex: 1 }}>
        <Paper
          sx={{ margin: "50px  auto", width: "fit-content" }}
          elevation={10}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            padding={2}
          >
            <Container component="main" maxWidth="sm">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                padding={2}
              >
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        value={formData.nomAnonce}
                        InputLabelProps={{ shrink: true }}
                        type="text"
                        onChange={handleInputChange}
                        label="Nom Anonce"
                        name="nomAnonce"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        value={formData.description}
                        InputLabelProps={{ shrink: true }}
                        type="text"
                        onChange={(e) => {
                          if (e.target.value.length <= 48 * 10)
                            handleInputChange(e);
                        }}
                        label="Description"
                        name="description"
                        multiline
                        maxRows={10}
                      />
                    </Grid>{" "}
                    <Grid item xs={12}>
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
                        {categories != null ? (
                          categories.map((categorie) => {
                            return (
                              <Button
                                key={categorie.id}
                                size="small"
                                variant={
                                  categorie.state ? "contained" : "outlined"
                                }
                                color={categorie.state ? "secondary" : "Black"}
                                sx={{
                                  color: categorie.state ? "white" : "black",
                                  margin: "0 10px 0 0 ",
                                  minWidth: "fit-content",
                                }}
                                onClick={() => {
                                  let cat = formData.categories;
                                  if (categorie.state) {
                                    cat = cat.filter((c) => {
                                      console.log(c + " != " + categorie.id);
                                      console.log(c != categorie.id);
                                      return c != categorie.id;
                                    });
                                  } else {
                                    cat.push(categorie.id);
                                  }
                                  setFormData({
                                    ...formData,
                                    categories: cat,
                                  });
                                  setCategories(
                                    categories.map((c) => {
                                      if (c.id == categorie.id)
                                        return { ...c, state: !c.state };
                                      else return c;
                                    })
                                  );
                                }}
                              >
                                {categorie.id}
                              </Button>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </Box>
        </Paper>
      </div>
      <Paper
        elevation={5}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: 1,
        }}
      >
        <Button variant="outlined" color="error" onClick={handlePrevious}>
          Previous
        </Button>
        <Typography component="h1" variant="h5">
          Step {currentStep} : Description and categories
        </Typography>
        <Button variant="outlined" onClick={handleNext}>
          Next
        </Button>
      </Paper>
    </>
  ) : currentStep == 4 ? (
    <>
      <div style={{ flex: 1 }}>
        <Paper
          sx={{ margin: "50px  auto", width: "fit-content" }}
          elevation={10}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            padding={2}
          >
            <Container component="main" maxWidth="sm">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                padding={2}
              >
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Stack direction={"row"} justifyContent={"space-between"}>
                        <Button
                          component="label"
                          variant="contained"
                          color="error"
                          onClick={() => {
                            handleDeleteImage(formData.public_id);
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          component="label"
                          variant="contained"
                          onClick={() => {
                            widget.current.open();
                          }}
                          disabled={formData.imageUrl != ""}
                        >
                          Select
                        </Button>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="h5"
                        padding={1}
                        sx={{ wordBreak: "break-all" }}
                      >
                        {"File : " + formData.fileName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </Box>
        </Paper>
      </div>
      <Paper
        elevation={5}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: 1,
        }}
      >
        <Button variant="outlined" color="error" onClick={handlePrevious}>
          Previous
        </Button>
        <Typography component="h1" variant="h5">
          Step {currentStep} : Selectionner une image
        </Typography>
        <Button
          variant="outlined"
          onClick={(e) => {
            handleNext();
          }}
        >
          Next
        </Button>
      </Paper>
    </>
  ) : currentStep == 5 ? (
    <>
      <div style={{ flex: 1 }}>
        <AnonceDetails Data={formData} />
      </div>
      <Paper
        elevation={5}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: 1,
        }}
      >
        <Button variant="outlined" color="error" onClick={handlePrevious}>
          Previous
        </Button>
        <Typography component="h1" variant="h5">
          Step {currentStep} : Validation des données
        </Typography>
        <Button variant="contained" onClick={handleSubmit} disabled={disabled}>
          Submit
        </Button>
      </Paper>
    </>
  ) : (
    <></>
  );
};

export default Form;
