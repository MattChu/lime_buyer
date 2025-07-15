import { useState, useContext } from "react";

import { LocationContext } from "../contexts/LocationContext";

function InputLocation() {
  const { setLocation } = useContext(LocationContext);
  const [postCode, setPostCode] = useState("");
  const [locationError, setLocationError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!postCode) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${postCode}&countrycodes=gb`
      );
      const data = await response.json();
      if (data[0]) {
        const { lat, lon } = data[0];
        setLocationError(null);
        setLocation([parseFloat(lat), parseFloat(lon)]);
      } else {
        setLocationError("Postcode not found");
        setPostCode("");
      }
    } catch (err) {
      setLocationError("Failed to fetch location");
    }
  };

  return (
    <form onSubmit={handleSearch} className="location-form">
      <input className="location-input"type="text" placeholder="Enter postcode" value={postCode} onChange={(e) => setPostCode(e.target.value)} />
      <button type="submit" className="location-button">Enter</button>
      {locationError && <p className="location-error">{locationError}</p>}
    </form>
  );
}

export default InputLocation;
