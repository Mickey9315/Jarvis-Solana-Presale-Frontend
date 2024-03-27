'use client'

import React, { createContext, useState, ReactNode } from 'react';

export const ThemeContext = createContext({
  isDark: false,
  setIsDark: () => { },
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};