import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  const login = (token) => {
    setAuthenticated(true);
    Cookies.set('authToken', token, { expires: 1 }); 
  };

  const logout = () => {
    setAuthenticated(false);
    Cookies.remove('authToken');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
