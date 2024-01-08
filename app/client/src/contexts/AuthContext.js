import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => {
    // Ici, tu pourrais effectuer une logique d'authentification
    // (par exemple, en vérifiant les identifiants) et définir l'état d'authentification en conséquence.
    setAuthenticated(true);
  };

  const logout = () => {
    // Logique pour se déconnecter
    setAuthenticated(false);
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
