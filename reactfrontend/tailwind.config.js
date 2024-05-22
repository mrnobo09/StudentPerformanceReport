/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '-20px 55px 70px -25px rgba(0, 0, 0, 1)',
      }
    },
  },
  plugins: [],
}

