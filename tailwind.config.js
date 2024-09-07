/** @type {import('tailwindcss').Config} */
const { addIconSelectors } = require('@iconify/tailwind');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      width: {
        '.5/10': "5%"
      }
    },
  },
  plugins: [],
}

