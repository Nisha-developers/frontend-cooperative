/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cooperative-cream': '#FDF6EC',   // Background
        'cooperative-dark': '#003000',    // Primary text
        'cooperative-orange': '#F57C00',  // Accent buttons/links
        'cooperative-teal': '#2E7D32',    // Secondary elements
        'cooperative-brown': '#2E7D32',   // Headers/highlights
      },
       keyframes: {
        spinIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
         blurIn: {
          '0%': { filter: 'blur(0px)' },
          '100%': {filter: 'blur(20px)'},
        },
      },
      animation: {
        spinIn: 'spinIn 1s ease-in forwards 5s', // duration 2s, ease-in, delay 5s
        blurIn: 'blurIn 1s ease-in 5s forwards'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      screens: {
        'custom-1000': '998px',
      },
    },
  },
  plugins: [],
};