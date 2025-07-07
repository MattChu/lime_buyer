import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { UserProvider } from "./contexts/UserContext";
import { LocationProvider } from "./contexts/LocationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <LocationProvider>
        <App />
      </LocationProvider>
    </UserProvider>
  </StrictMode>
);
