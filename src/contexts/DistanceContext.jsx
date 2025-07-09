import { createContext, useState } from "react";

export const DistanceContext = createContext();

export const DistanceProvider = ({ children }) => {
  const [distance, setDistance] = useState(500.0);
  return <DistanceContext.Provider value={{ distance, setDistance }}>{children}</DistanceContext.Provider>;
};
