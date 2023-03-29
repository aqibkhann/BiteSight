/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        },
      },
      animation: {
        'bounce-slow': 'bounce-slow 3s infinite', // Adjust the duration here
      },
      transitionDelay: {
        300: '300ms',
        600: '600ms',
      },
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "500px",
      ss: "1200px",
      sm: "1200px",
      md: "1200x",
      lg: "1200px",
      xl: "1500px",
    },
  },
  plugins: [],
};
