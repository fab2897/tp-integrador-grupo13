import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

  const [admin, setAdmin] = useState(() => {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  });

  const login = (userData) => {
    setAdmin(userData);
    localStorage.setItem('userSession', JSON.stringify(userData));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('userSession');
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};