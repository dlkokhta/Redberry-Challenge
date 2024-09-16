/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        grayBorder: "#DBDBDB",
        red: "#F93B1D",
        textBlack: " #021526",
        textGreen: " #45A849",
        textRed: " #F93B1D",
      },

      fontFamily: {
        firaGo: ["FiraGO", "sans-serif"],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
      },
    },

    screens: {
      xl: "1280px",
    },
  },

  plugins: [],
};
