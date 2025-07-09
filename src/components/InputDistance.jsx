import { useContext } from "react";

import { DistanceContext } from "../contexts/DistanceContext";

function InputDistance() {
  const { setDistance } = useContext(DistanceContext);
  const handleChange = (e) => {
    setDistance(parseFloat(e.target.value));
  };

  return (
    <form>
      <label htmlFor="distance">Set Max Distance:</label>
      <select onChange={handleChange} name="distance" id="distance">
        <option value="100.00">100m</option>
        <option value="500.00">500m</option>
        <option value="1000.00">1km</option>
        <option value="2000.00">2km</option>
      </select>
    </form>
  );
}

export default InputDistance;
