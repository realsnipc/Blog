/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      work: ['"Work Sans"', "sans-serif"],
      nunito: ['"Nunito Sans"', "sans-serif"],
      inter: ["Inter", "serif"],
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
