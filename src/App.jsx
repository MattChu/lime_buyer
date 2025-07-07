import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapViewer";
import InputLocation from "./components/InputLocation";

function App() {
  const { user, setuser } = useContext(UserContext);
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<MapView />} />
        <Route path="/inputlocation" element={<InputLocation />} />
      </Routes>
    </Router>
  );
}

export default App;
