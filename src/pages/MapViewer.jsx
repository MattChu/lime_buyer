import { MapContainer, TileLayer, Marker, Popup, useMap, ScaleControl, LayerGroup } from "react-leaflet";
import "react-spinners";

import "leaflet/dist/leaflet.css";

import { useContext, useEffect } from "react";

import { LocationContext } from "../contexts/LocationContext";
import { DistanceContext } from "../contexts/DistanceContext";

import FruitShopLocator from "../components/FruitShopLocator";
import InputLocation from "../components/InputLocation";
import InputDistance from "../components/InputDistance";
import LoaderError from "../components/LoaderError";

import { Container } from "@mui/material";

const ReFocusMap = ({ location, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(location, zoom);
  }, [location, zoom]);
};

const getZoomByDistance = (distance) => {
  switch (distance) {
    case 100:
      return 17;
    case 500:
      return 16;
    case 1000:
      return 15;
    case 2000:
      return 14;
    default:
      return 14;
  }
};

function MapView() {
  const { location } = useContext(LocationContext);
  const { distance } = useContext(DistanceContext);
  const zoom = getZoomByDistance(distance);
  return (
    <>
      <LoaderError />
      <MapContainer center={location} zoom={zoom} scrollWheelZoom={true} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ReFocusMap location={location} zoom={zoom} distance={distance} />
        <Marker position={location}>
          <Popup>You are here</Popup>
        </Marker>
        <FruitShopLocator />
      </MapContainer>
    </>
  );
}

export default MapView;
