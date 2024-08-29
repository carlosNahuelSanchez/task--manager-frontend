/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/js/**/*.js"],
  theme: {
  extend: {
    fontFamily: {
      'custom': ['Poppins', 'sans-serif'],
    },
  },
  },
  plugins: [],
  };