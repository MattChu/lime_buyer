import { useContext } from "react";

import { DistanceContext } from "../contexts/DistanceContext";

function InputDistance() {
  const { distance, setDistance } = useContext(DistanceContext);
  const handleChange = (e) => {
    setDistance(parseFloat(e.target.value));
  };

  return (
    <form>
      <label htmlFor="distance">Set Max Distance:</label>
      <select onChange={handleChange} name="distance" id="distance" value={distance}>
        <option value={100.0}>100m</option>
        <option value={500.0}>500m</option>
        <option value={1000.0}>1km</option>
        <option value={2000.0}>2km</option>
      </select>
    </form>
  );
}

export default InputDistance;
