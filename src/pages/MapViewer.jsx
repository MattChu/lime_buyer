import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";

import FruitMarker from "../components/FruitLocator";

function MapView() {
  const { location, setLocation } = useContext(LocationContext);

  if (!location) {
    return <p>Loading map...</p>;
  }

  return (
    <MapContainer center={location} zoom={13} scrollWheelZoom={true} style={{ height: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={location}>
        <Popup>You are here</Popup>
      </Marker>
      <FruitMarker />
    </MapContainer>
  );
}

export default MapView;
