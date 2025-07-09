import { MapContainer, TileLayer, Marker, Popup, useMap, ScaleControl, LayerGroup } from "react-leaflet";
import "react-spinners";

import "leaflet/dist/leaflet.css";

import { useContext, useEffect } from "react";

import { Navigate } from "react-router-dom";

import { LocationContext } from "../contexts/LocationContext";
import { LoadingAndErrorContext } from "../contexts/LoadingErrorContext";

import FruitMarker from "../components/FruitLocator";
import InputLocation from "../components/InputLocation";
import InputDistance from "../components/InputDistance";
import { PropagateLoader } from "react-spinners";

const ReCenterMap = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(location, 13);
  }, [location]);
};

function MapView() {
  const { location } = useContext(LocationContext);
  const { isLoading, isError } = useContext(LoadingAndErrorContext);
  return (
    <>
      <InputLocation />
      <InputDistance />
      {isError && <Navigate to="/lemons" />}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PropagateLoader color="green" />
        </div>
      )}
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
