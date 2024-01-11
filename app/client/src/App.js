import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Auth from "./pages/Auth/index";
import Home from "./pages/Home/index"; 
import Settings from "./pages/Settings/index";
import Itinerary from "./pages/Itinerary/index";
import Stations from "./pages/Stations";
import SaveItinerary from "./pages/SaveItinerary";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/new-itinerary" element={<Itinerary />} />
          <Route path="/list-stations" element={<Stations />} />
          <Route path="/my-itineraries" element={<SaveItinerary />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
