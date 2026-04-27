// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         poppins: ["Poppins", "sans-serif"],
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        // Primary Brand Colors
        primary: {
          DEFAULT: '#8B1E2D',     // Main brand color
          light: '#A52A3E',       // Lighter shade
          dark: '#6B1622',        // Darker shade
          soft: '#FEE2E2',        // Soft background
          50: '#FDF2F2',
          100: '#FCE8E8',
          200: '#F7CECE',
          300: '#F0A5A5',
          400: '#E66C6C',
          500: '#DC2626',
          600: '#C41E3A',
          700: '#8B1E2D',        // Your main color
          800: '#6B1622',
          900: '#4A0F17',
        },
        // Background Colors
        background: {
          main: '#F9FAFB',
          card: '#FFFFFF',
          dark: '#1F2937',
        },
        // Text Colors
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          disabled: '#9CA3AF',
        },
        // Border Colors
        border: {
          light: '#E5E7EB',
          medium: '#D1D5DB',
          dark: '#9CA3AF',
        },
        // Status Colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
    },
  },
  plugins: [],
};