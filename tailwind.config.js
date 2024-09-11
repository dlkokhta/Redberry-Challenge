/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        grayBorder: "#DBDBDB",
      },
    },
    extend: {
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
