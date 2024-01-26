/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "64em" },
      md: { max: "48em" },
      sm: { max: "40em" },
      xsm: { max: "32em" },
      "2xsm": { max: "24em" },
    },

    extend: {},
  },
  plugins: [],
};

// "Plastic Bottles": "#21A251",
//   "Scrap Metal": "#6B2F0E",
//   Glass: "#EA4D2A",
//   Textile: "#C3C639",
//   "E-waste": "#4B443E",
//   "Food waste": "#B939D9",
//   "Biodegradable Waste": "#D7B981",
