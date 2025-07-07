import { useState, useContext } from "react";

import { LocationContext } from "../contexts/LocationContext";

function InputLocation() {
  const { setLocation } = useContext(LocationContext);
  const [postCode, setPostCode] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!postCode) return;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${postCode}&countrycodes=gb`
    );
    const data = await response.json();
    const { lat, lon } = data[0];
    console.log(lat);
    setLocation([parseFloat(lat), parseFloat(lon)]);
  };
  return (
    <form onSubmit={handleSearch}>
      <input type="text" placeholder="Enter postcode" value={postCode} onChange={(e) => setPostCode(e.target.value)} />
      <button type="submit">Enter</button>
    </form>
  );
}

export default InputLocation;
