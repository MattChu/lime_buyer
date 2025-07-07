import { createContext, useState, useEffect } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.warn("Geolocation error:", error);
        setLocation([53.4808, -2.2426]);
      }
    );
  }, []);

  return <LocationContext.Provider value={{ location, setLocation }}>{children}</LocationContext.Provider>;
};
