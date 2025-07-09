import { createContext, useState, useEffect } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState([53.6898, -1.4866]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.warn("Geolocation error:", error);
        setLocation([53.6898, -1.4866]);
      }
    );
  }, []);
  return <LocationContext.Provider value={{ location, setLocation }}>{children}</LocationContext.Provider>;
};
