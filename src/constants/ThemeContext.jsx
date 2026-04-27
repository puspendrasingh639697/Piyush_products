import React, { createContext, useContext, useState, useEffect } from 'react';
import { COLORS } from '../config/colors';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState(COLORS.primary.main);

  // Update CSS variables when color changes
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-main', primaryColor);
    document.documentElement.style.setProperty('--primary-light', adjustColor(primaryColor, 20));
    document.documentElement.style.setProperty('--primary-dark', adjustColor(primaryColor, -20));
    document.documentElement.style.setProperty('--secondary-border', primaryColor);
    document.documentElement.style.setProperty('--secondary-text', primaryColor);
    
    // Save to localStorage
    localStorage.setItem('primaryColor', primaryColor);
  }, [primaryColor]);

  // Load saved color on mount
  useEffect(() => {
    const savedColor = localStorage.getItem('primaryColor');
    if (savedColor) {
      setPrimaryColor(savedColor);
    }
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  // Helper function to adjust color brightness
  const adjustColor = (color, percent) => {
    // Simple color adjustment - you can use a library like color for better results
    return color;
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const changePrimaryColor = (newColor) => {
    setPrimaryColor(newColor);
  };

  const predefinedColors = [
    { name: 'Dark Red', value: '#8B1E2D' },
    { name: 'Blue', value: '#2563EB' },
    { name: 'Green', value: '#059669' },
    { name: 'Purple', value: '#7C3AED' },
    { name: 'Orange', value: '#EA580C' },
    { name: 'Teal', value: '#0D9488' },
    { name: 'Pink', value: '#DB2777' },
    { name: 'Indigo', value: '#4F46E5' },
  ];

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      primaryColor,
      toggleTheme,
      changePrimaryColor,
      predefinedColors
    }}>
      {children}
    </ThemeContext.Provider>
  );
};