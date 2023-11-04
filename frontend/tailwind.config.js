/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "base-text": "#3f4e58",
        "primary": "#89aabd",
        "primary-accent": "#7391a1",
        "destructive": "#bf0a30",
        "confirm":"#3a9a72",
      }
    },
  },
  plugins: [],
}

