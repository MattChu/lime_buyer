import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { useContext, useEffect } from "react";
import { LocationContext } from "../contexts/LocationContext";

import FruitMarker from "../components/FruitLocator";
import InputLocation from "../components/InputLocation";
import InputDistance from "../components/inputDistance";

const ReCenterMap = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(location, 13);
  }, [location]);
};

function MapView() {
  const { location, setLocation } = useContext(LocationContext);
  if (!location) {
    return <p>Loading map...</p>;
  }

  return (
    <>
      <InputLocation />
      <InputDistance />
      <MapContainer center={location} zoom={13} scrollWheelZoom={true} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ReCenterMap location={location} />
        <Marker position={location}>
          <Popup>You are here</Popup>
        </Marker>
        <FruitMarker />
      </MapContainer>
    </>
  );
}

export default MapView;
