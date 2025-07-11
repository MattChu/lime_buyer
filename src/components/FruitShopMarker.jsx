import { Marker } from "react-leaflet";

import FruitShopPopUp from "./FruitShopPopUp";

function FruitShopMarker({ shop }) {
  const glowingIcon = L.divIcon({
    className: "custom-glow-icon",
    html: `<div class='marker-dot ${shop.type}'></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return (
    <Marker position={[shop.lat, shop.lon]} icon={glowingIcon}>
      <FruitShopPopUp shop={shop} />
    </Marker>
  );
}

export default FruitShopMarker;
