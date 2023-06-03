import L from "leaflet";
import React from "react";
import { Dialog } from "@mui/material";
import { Slide } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import AnonceMap from "./AnonceMap";
import { findById } from "../Utils/SearchFunctions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Carte = ({ idChosen, setIdAnonce, anonces }) => {
  const map_div = React.useRef(null);
  const map = React.useRef(null);

  const [open, setOpen] = React.useState(false);
  const [currentAnonce, setCurrentAnonce] = React.useState(null);

  const handleMarkerClick = (e) => {
    map.current.setView(e.latlng, 5);
    let anonce = findById(anonces, e.target.id);
    setTimeout(() => {
      setCurrentAnonce(anonce);
      handleClickOpen();
    }, 500);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIdAnonce(null);
    setOpen(false);
  };

  React.useEffect(() => {
    document.getElementById("root").style =
      "display: flex;" +
      "flex-direction: column;" +
      "height: 100%;" +
      "width: 100%;";
    try {
      map.current = L.map(map_div.current.id).setView({ lat: 0, lng: 0 }, 1);
      console.log("map is not null");
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        noWrap: true,
      }).addTo(map.current);

      for (let i = 0; i < anonces.length; i++) {
        let marker = L.marker({
          lat: anonces[i].latitude,
          lng: anonces[i].longitude,
        }).on("click", (e) => {
          handleMarkerClick(e);
        });
        marker.id = anonces[i].idAnonce;
        marker.addTo(map.current);
      }
    } catch (error) {
      if (error.message.includes("Map container is already initialized"))
        console.log("React Strict mode !");
      else console.log(error);
    }
    if (idChosen != null && currentAnonce == null) {
      let anonce = findById(anonces, idChosen);
      if (anonce != null) {
        map.current.setView({ lat: anonce.latitude, lng: anonce.longitude }, 5);
        setTimeout(() => {
          setCurrentAnonce(anonce);
          handleClickOpen();
        }, 500);
      }
    } else {
      console.log(open);
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
          <AnonceMap anonce={currentAnonce} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Carte;
