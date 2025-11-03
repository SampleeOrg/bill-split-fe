/** @type {import('tailwindcss').Config} */

const token = require("./utils/token.js");

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        inter: ["inter"],
      },
      colors: {
        primary1: token.colors.primary1,
        primary2: token.colors.primary2,
        primary3: token.colors.primary3,
        primary4: token.colors.primary4,
        alert: token.colors.alert,
        secondary1: token.colors.secondary1,
        secondary2: token.colors.secondary2,
        secondary3: token.colors.secondary3,
        secondary4: token.colors.secondary4,
        dark1: token.colors.dark1,
        dark2: token.colors.dark2,
        dark3: token.colors.dark3,
        light1: token.colors.light1,
        light2: token.colors.light2,
        light3: token.colors.light3,
        light4: token.colors.light4,
      },
    },
  },
  plugins: [],
};
