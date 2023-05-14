import L from "leaflet";
import React from "react";

const Carte = ({ anonces }) => {
  const map_div = React.useRef(null);
  const [coordonnées, set_coordonnées] = React.useState({
    lat: 33.57094853077502,
    lng: -7.604995965957642,
  });

  React.useEffect(() => {
    try {
      let map = L.map(map_div.current.id).setView(coordonnées, 10);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      map.on("click", (e) => {
        console.log(e.latlng);
      });
      L.marker({ lat: 33.57094853077502, lng: -7.604995965957642 })
        .on("click", (e) => {
          map.setView(e.latlng);
          set_coordonnées(e.latlng);
          console.log(`feature clicked at : ${e.latlng} `);
        })
        .addTo(map);
      L.marker({ lat: 40.57094853077502, lng: -7.604995965957642 })
        .on("click", (e) => {
          map.setView(e.latlng);
          set_coordonnées(e.latlng);
          console.log(`feature clicked at : ${e.latlng} `);
        })
        .addTo(map);
    } catch (error) {
      if (error.message.includes("Map container is already initialized"))
        console.log("React Strict mode !");
      else console.log(error);
    }
  });

  return (
    <>
      <div
        id="map"
        ref={map_div}
        style={{ width: "100%", height: "100%" }}
      ></div>
    </>
  );
};

export default Carte;
