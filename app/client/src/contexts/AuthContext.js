import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = (token) => {
    setAuthenticated(true);
    Cookies.set('authToken', token, { expires: 1 }); // Le token expire après 1 jour (ajuste selon tes besoins)
  };

  const logout = () => {
    setAuthenticated(false);
    Cookies.remove('authToken');
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
