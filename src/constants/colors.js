// src/constants/colors.js
// Production ready - Single source of truth for colors

export const COLORS = {
  // Primary Brand Color - Change only this one value
  PRIMARY: '#8B1E2D',     // Dark Red
  PRIMARY_LIGHT: '#A52A3E',
  PRIMARY_DARK: '#6B1622',
  PRIMARY_SOFT: '#FEE2E2',
  
  // Secondary Colors
  SECONDARY: '#FFFFFF',
  
  // Background Colors
  BG_MAIN: '#F9FAFB',
  BG_CARD: '#FFFFFF',
  
  // Text Colors
  TEXT_PRIMARY: '#111827',
  TEXT_SECONDARY: '#6B7280',
  
  // Border Colors
  BORDER_LIGHT: '#E5E7EB',
  
  // Status Colors
  SUCCESS: '#10B981',
  ERROR: '#EF4444',
  WARNING: '#F59E0B',
};

// Tailwind config ke liye
export const tailwindColors = {
  'primary': COLORS.PRIMARY,
  'primary-light': COLORS.PRIMARY_LIGHT,
  'primary-dark': COLORS.PRIMARY_DARK,
  'primary-soft': COLORS.PRIMARY_SOFT,
};

export default COLORS;