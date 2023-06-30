import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [timeActive, setTimeActive] = useState(false);

  const registerUser = async (email, password) => {
    // Register user logic
    setAuthenticated(true);
  };

  const loginUser = async (email, password) => {
    // Login user logic
    setAuthenticated(true);
  };

  const signOutUser = async () => {
    // Logout user logic
    setAuthenticated(false);
  };

  const value = {
    authenticated,
    timeActive,
    setTimeActive,
    registerUser,
    loginUser,
    signOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthValue = () => useContext(AuthContext);
