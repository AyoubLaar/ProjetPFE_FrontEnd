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
import AnonceDetails from "../components/AnonceDetails";
import Header from "../components/Header";
import { useParams } from "react-router";

const ModifierAnonce = () => {
  const idAnonce = React.useRef(useParams().id);
  const jwt = React.useRef(window.localStorage.getItem("ESTATE_HUB_JWT"));
  const [villes, setVilles] = React.useState(null);
  const [regions, setRegions] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [disabled, setDisabled] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const widget = React.useRef();
  const cloudinaryRef = React.useRef();

  const [formData, setFormData] = useState(null);

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
        })
        .catch((e) => {
          alert("error connecting to the server");
          window.location.assign("/profile");
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
          window.location.assign("/profile");
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
          window.location.assign("/profile");
        });
    }
    if (formData == null) {
      fetch(
        "http://localhost:8080/api/Membre/Anonce/Retrieve?id=" +
          idAnonce.current,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + jwt.current,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((Data) => {
          Data.type = Data.type == "achat" ? "1" : "0";
          setFormData(Data);
        })
        .catch((e) => {
          alert("access denied !");
          window.location.assign("/profile");
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
              setUrl(result.info.secure_url);
            }
          }
        );
      }
    }
  }, [currentStep]);

  React.useEffect(() => {
    if (formData != null) {
      categories.map((categorie) => {
        if (formData.categories.includes(categorie.id)) {
          categorie.state = true;
        } else {
          categorie.state = false;
        }
      });
    }
  }, [formData]);

  //#region

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
    setDisabled(true);
    const token = jwt.current;
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ ...formData, imageUrl: url }),
    };
    console.log({ ...formData, imageUrl: url });
    fetch(
      "http://localhost:8080/api/Membre/Modify/Anonce?id=" + idAnonce.current,
      options
    )
      .then((res) => {
        if (!res.ok) throw new Error();
        alert("Modification effectué avec succées");
        window.location.assign("/");
      })
      .catch((e) => {
        alert("Erreur modification");
        setDisabled(false);
      });
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
      if (formData.imageUrl === "" && url === "") {
        alert("image is required");
        isValid = false;
      }
    }
    return isValid;
  };

  const handleDeleteImage = () => {
    if (formData.imageUrl != null && formData.imageUrl != "") {
      console.log('imageUrl != null && != ""');
      const token = jwt.current;
      fetch(
        "http://localhost:8080/api/Membre/DeleteFile?id=" + idAnonce.current,
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
          });
          setUrl("");
        })
        .catch((e) => {
          alert("Cannot delete file!");
        });
    } else {
      if (url != "" && url != null) {
        console.log("url not empty !");
        const token = jwt.current;
        fetch("http://localhost:8080/api/Membre/DeleteFileCloudinary", {
          method: "DELETE",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ url: url }),
        })
          .then((res) => {
            if (!res.ok) throw new Error();
            setUrl("");
          })
          .catch((e) => {
            alert("Cannot delete file!");
          });
      }
    }
  };

  //#endregion
  return (
    <>
      <Header />
      {villes == null || regions == null || formData == null ? (
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
                              setFormData({
                                ...formData,
                                ville: newInputValue,
                              });
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
                              setFormData({
                                ...formData,
                                region: newInputValue,
                              });
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
              Step {currentStep} : Mettre à jour les Details
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
              center={[formData.latitude, formData.longitude]}
              zoom={7}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[formData.latitude, formData.longitude]}
                draggable={true}
                eventHandlers={{
                  move: (e) => {
                    setFormData({
                      ...formData,
                      longitude: e.target.getLatLng().lng,
                      latitude: e.target.getLatLng().lat,
                    });
                  },
                }}
              ></Marker>
            </MapContainer>
          </Box>
          <Stack
            flexDirection={"row"}
            justifyContent="space-between"
            padding={2}
          >
            <Button variant="outlined" color="error" onClick={handlePrevious}>
              Previous
            </Button>
            <Typography component="h1" variant="h5">
              Step {currentStep} : Mettre à jour map location
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
                                    color={
                                      categorie.state ? "secondary" : "Black"
                                    }
                                    sx={{
                                      color: categorie.state
                                        ? "white"
                                        : "black",
                                      margin: "0 10px 0 0 ",
                                      minWidth: "fit-content",
                                    }}
                                    onClick={() => {
                                      let cat = formData.categories;
                                      if (categorie.state) {
                                        cat = cat.filter((c) => {
                                          console.log(
                                            c + " != " + categorie.id
                                          );
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
              Step {currentStep} : Mettre à jour Description et categories
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
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                          >
                            <Button
                              component="label"
                              variant="contained"
                              color="error"
                              disabled={
                                (formData.imageUrl == "" ||
                                  formData.imageUrl == null) &&
                                url == ""
                              }
                              onClick={() => {
                                handleDeleteImage();
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
                              disabled={
                                (formData.imageUrl != "" &&
                                  formData.imageUrl != null) ||
                                url != ""
                              }
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
                            {formData.imageUrl != null &&
                            formData.imageUrl != ""
                              ? "File : " +
                                formData.imageUrl.split("/")[
                                  formData.imageUrl.split("/").length - 1
                                ]
                              : url != null && url != ""
                              ? "File : " +
                                url.split("/")[url.split("/").length - 1]
                              : "File : "}
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
              Step {currentStep} : Mettre à jour une image
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
            <AnonceDetails
              Data={{
                ...formData,
                imageUrl:
                  formData.imageUrl == "" || formData.imageUrl == null
                    ? url
                    : formData.imageUrl,
              }}
            />
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
              Step {currentStep} : Validation
            </Typography>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={disabled}
            >
              Modifier
            </Button>
          </Paper>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModifierAnonce;
