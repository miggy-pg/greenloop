/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
      xsm: { max: "522px" },
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
