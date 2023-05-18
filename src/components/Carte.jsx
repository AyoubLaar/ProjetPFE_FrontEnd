import L from "leaflet";
import React from "react";

const Carte = ({ anonces, setisList, setIdAnonce }) => {
  const map_div = React.useRef(null);
  const map = React.useRef(null);

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
      L.marker({ lat: 33.57094853077502, lng: -7.604995965957642 })
        .on("click", (e) => {
          map.current.setView(e.latlng);
          set_coordonnées(e.latlng);
          console.log(`feature clicked at : ${e.latlng} `);
        })
        .addTo(map.current);
      L.marker({ lat: 40.57094853077502, lng: -7.604995965957642 })
        .on("click", (e) => {
          map.current.setView(e.latlng);
          set_coordonnées(e.latlng);
          console.log(`feature clicked at : ${e.latlng} `);
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
    </>
  );
};

export default Carte;
