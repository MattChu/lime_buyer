import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapViewer";
import InputLocation from "./components/InputLocation";
import Error from "./pages/Error";
import EditProfile from "./pages/EditProfile";

function App() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/mapview" element={<MapView />} />
        <Route path="/lemons" element={<Error />} />
        <Route path="*" element={<Navigate to="/mapview" />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
