import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(); // Crea el contexto

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exporta el contexto
export { AuthContext }; // Añade esta línea para exportar AuthContext

export const useAuth = () => {
  return useContext(AuthContext);
};
