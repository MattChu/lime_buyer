import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { UserProvider } from "./contexts/UserContext";
import { LocationProvider } from "./contexts/LocationContext.jsx";
import { DistanceProvider } from "./contexts/DistanceContext.jsx";
import { LoadingAndErrorProvider } from "./contexts/LoadingErrorContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <LoadingAndErrorProvider>
        <LocationProvider>
          <DistanceProvider>
            <App />
          </DistanceProvider>
        </LocationProvider>
      </LoadingAndErrorProvider>
    </UserProvider>
  </StrictMode>
);
