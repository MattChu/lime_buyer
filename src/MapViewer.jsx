import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// Add marker function for clicking to add markers. MISSING LIME PNG to add later. Note this will need additional functionality as seems flimsy with one click add.
function AddMarker() {
    const [markers, setMarkers] = useState([])

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng
            setMarkers([...markers, {lat, lng}])
        }
    })
    return (
    <>
      {markers.map((pos, index) => (
        <Marker key={index} position={[pos.lat, pos.lng]} icon={limeMarker}>
          <Popup>
            Lovely limes #{index + 1}
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function MapView() {
    const [userLocation, setUserLocation] = useState(null);
    
// useEffect to determine users current location and setting coordinates.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.warn("Geolocation error:", error);
        setUserLocation([53.4808, -2.2426]);
      }
    );
  }, []);

  if (!userLocation) {
    return <p>Loading map...</p>;
  }

  return (
    <MapContainer
      center={userLocation}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "1000px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      
      <Marker position={userLocation}>
        <Popup>You are here</Popup>
      </Marker>
      <FruitMarker userLocation={userLocation} />
      <AddMarker />
    </MapContainer>
  );
}


export default MapView;