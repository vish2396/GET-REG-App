// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuthValue = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuthValue must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [timeActive, setTimeActive] = useState(false);

  return (
    <AuthContext.Provider value={{ setTimeActive, timeActive }}>
      {children}
    </AuthContext.Provider>
  );
};
