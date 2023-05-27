import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import axios from "axios";
import "./FormAnonce.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;

const Form = () => {
  const center_position = [33.66492, -7.817975];
  const [markerPosition, setMarkerPosition] = useState({
    lat: 33.66492,
    lng: -7.817975,
  });
  const handleMapClick = (e) => setMarkerPosition(e.latlng);

  const handleClick = () => {
    if (markerPosition) {
      alert(markerPosition.lat, markerPosition.lng);
    } else {
      alert("No marker selected.");
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    // Do something with the selected files
    console.log(files);
  };

  const MapClickEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "",
    // proprieterType: "",
    latitude: 0,
    longtitude: 0,
    prix: 0,
    surface: 0,
    nbreChambres: 0,
    nbreSalleBain: 0,
    nbreEtages: 0,
    etat: "A",
  });
  const [formErrors, setFormErrors] = useState({});

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
      setFormErrors({});
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setFormErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (validateForm()) {
      axios
        .post("http://localhost:8080/Anonce", formData)
        .then((response) => {
          console.log(response.data); // Handle success response
        })
        .catch((err) => {
          console.log(err); // Handle error response
        });
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.type) {
        errors.type = "Anonce Type is required";
        isValid = false;
      }
      if (formData.prix < 0) {
        errors.prix = "Prix must be a positive number";
        isValid = false;
      }
      if (formData.surface < 0) {
        errors.surface = "surface must be a positive number";
        isValid = false;
      }
      if (formData.nbreChambres < 0) {
        errors.nbreChambres = "Number of bedrooms must be a positive number";
        isValid = false;
      }
      if (formData.nbreSalleBain < 0) {
        errors.nbreSalleBain = "Number of bathrooms must be a positive number";
        isValid = false;
      }
      if (formData.nbreEtages < 0) {
        errors.nbreEtages = "Number floors must be a positive number";
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <section>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div>
              <h2>Step 1:Proprieter Information</h2>
              <div className="form-detail">
                <div className="form-group">
                  <span>prix</span>
                  <input
                    type="number"
                    name="prix"
                    placeholder="prix dh"
                    value={formData.prix}
                    onChange={handleInputChange}
                  />
                  {formErrors.prix && (
                    <span className="error">{formErrors.prix}</span>
                  )}
                </div>
                <div className="form-group">
                  <span>surface</span>
                  <input
                    type="number"
                    name="surface"
                    placeholder="surface m2"
                    value={formData.surface}
                    onChange={handleInputChange}
                  />
                  {formErrors.surface && (
                    <span className="error">{formErrors.surface}</span>
                  )}
                </div>
              </div>
              <div className="form-detail">
                <div className="form-group">
                  <span>number chambre</span>
                  <input
                    type="number"
                    name="nbreChambres"
                    placeholder="number chambre"
                    value={formData.nbreChambres}
                    onChange={handleInputChange}
                  />
                  {formErrors.nbreChambres && (
                    <span className="error">{formErrors.nbreChambres}</span>
                  )}
                </div>
                <div className="form-group">
                  <span>numbere de salle de bien</span>
                  <input
                    type="number"
                    name="nbreSalleBain"
                    placeholder="numbere de salle de bien"
                    value={formData.nbreSalleBain}
                    onChange={handleInputChange}
                  />
                  {formErrors.nbreSalleBain && (
                    <span className="error">{formErrors.nbreSalleBain}</span>
                  )}
                </div>
              </div>
              <div className="form-detail">
                <div className="form-group">
                  <span>Numero etage</span>
                  <input
                    type="number"
                    name="nbreEtages"
                    placeholder="Numero etage"
                    value={formData.nbreEtages}
                    onChange={handleInputChange}
                  />
                  {formErrors.nbreEtages && (
                    <span className="error">{formErrors.nbreEtages}</span>
                  )}
                </div>
                <div className="form-group">
                  <span>type</span>
                  <select
                    name="type"
                    value={formData.type}
                    className=""
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="l">louer</option>
                    <option value="V">Vente</option>
                  </select>
                  {formErrors.type && (
                    <span className="error">{formErrors.type}</span>
                  )}
                </div>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <h2>Step 2: maps</h2>
              <div className="maps">
                <MapContainer
                  center={center_position}
                  zoom={7}
                  scrollWheelZoom={false}
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
                  >
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable. Marker
                      Position:
                    </Popup>
                  </Marker>
                </MapContainer>

                {/* <div>
                    <select id="region" name="region" className="region">
                      <option value="option1-1">Option 1-1</option>
                      <option value="option1-2">Option 1-2</option>
                      <option value="option1-3">Option 1-3</option>
                    </select>
                  </div> */}
                {/* <div>
                    <select id="optvilleion1" name="ville" className="ville">
                      <option value="option1-1">Option 1-1</option>
                      <option value="option1-2">Option 1-2</option>
                      <option value="option1-3">Option 1-3</option>
                    </select>
                  </div> */}
                {/* <input
                    type="text"
                    placeholder="adresse"
                    className="adresse"
                  /> */}
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <h2>Step 3: title</h2>
              <input
                type="text"
                placeholder="nomAnonce"
                name="nomAnonce"
                className="adresse"
              />
              <textarea
                name="dexcription"
                id=""
                placeholder="dexcription"
                cols="20"
                rows="6"
              ></textarea>
            </div>
          )}
          {currentStep === 4 && (
            <div>
              <h2>Step 4: images</h2>
              {currentStep === 4 && (
                <div>
                  <div className="">
                    <label htmlFor="image" className="">
                      Select an image:
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="imageUrl"
                      multiple
                      accept="image/jpeg,image/png, image/jpg"
                      className=""
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {currentStep === 5 && (
            <div>
              <h2>Step 5: Confirmation</h2>
              <p>AnonceType: {formData.AnonceType}</p>
              <p>proprieterType: {formData.proprieterType}</p>
              <p>prix: {formData.prix}</p>
              <p>surface: {formData.surface}</p>
              <p>nbreChambres: {formData.nbreChambres}</p>
              <p>nbreSalleBain: {formData.nbreSalleBain}</p>
              <p>nbreSalleBain: [markerPosition.lat, markerPosition.lng]</p>
            </div>
          )}
          <div className="button-group">
            {currentStep > 1 && (
              <button
                type="button"
                className="prev-button"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )}
            {currentStep < 5 ? (
              <button
                type="button"
                className="next-button "
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="submit-button">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default Form;
