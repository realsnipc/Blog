/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'work': ['"Work Sans"', 'sans-serif'],
      'nunito': ['"Nunito Sans"', 'sans-serif'],
      'inter': ['Inter', 'serif'] // Ensure fonts with spaces have " " surrounding it.
    }
  },
  plugins: [],
}