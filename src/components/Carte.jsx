import L from "leaflet";
import React from "react";
import { Dialog } from "@mui/material";
import { Slide } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import AnonceMap from "./AnonceMap";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Carte = ({ idChosen, setIdAnonce, anonces }) => {
  const map_div = React.useRef(null);
  const map = React.useRef(null);

  const [open, setOpen] = React.useState(idChosen != null);
  const [Current_Anonce, setCurrent_Anonce] = React.useState();

  const handleClickOpen = (id) => {
    setIdAnonce(id);
    setOpen(true);
  };

  const handleClose = () => {
    setIdAnonce(null);
    setOpen(false);
  };

  const [coordonnées, set_coordonnées] = React.useState({
    lat: 33.57094853077502,
    lng: -7.604995965957642,
  });

  React.useEffect(() => {
    document.getElementById("root").style =
      "display: flex;" +
      "flex-direction: column;" +
      "height: 100%;" +
      "width: 100%;";
    try {
      map.current = L.map(map_div.current.id).setView(coordonnées, 10);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        noWrap: true,
        bounds: [
          [-90, -180],
          [90, 180],
        ],
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map.current);
      let marker = L.marker({
        lat: 33.57094853077502,
        lng: -7.604995965957642,
      }).on("click", (e) => {
        map.current.setView(e.latlng);
        handleClickOpen(e.target.id);
        set_coordonnées(e.latlng);
      });
      marker.id = "36";
      marker.addTo(map.current);
      L.marker({ lat: 40.57094853077502, lng: -7.604995965957642 })
        .on("click", (e) => {
          handleClickOpen();
          map.current.setView(e.latlng);
          set_coordonnées(e.latlng);
        })
        .addTo(map.current);
    } catch (error) {
      if (error.message.includes("Map container is already initialized"))
        console.log("React Strict mode !");
      else console.log(error);
    }
    return () => {
      document.getElementById("root").style = "";
    };
  });

  return (
    <>
      <div id="map" ref={map_div}></div>
      <Dialog
        scroll="body"
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogContent>
          <AnonceMap
            idAnonce={idChosen}
            Nom=""
            prix=""
            latitude=""
            longitude=""
            nbreEtoiles=""
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Carte;
