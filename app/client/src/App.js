import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Auth from "./pages/Auth/index";
import Home from "./pages/Home/index"; 
import Settings from "./pages/Settings/index";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
