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

    extend: {
      fontSize: {
        clamp: "clamp(1rem, 4vw, 1.8rem)",
        "clamp-to-desktop": "clamp(0.5rem, 4vw, 1rem)",
        "clamp-base": "clamp(0.9rem, 1vw, 1rem)",
        "clamp-xs": "clamp(0.8rem, 1vw, 0.9rem)",
      },
      gridTemplateRows: {
        chat: "4rem minmax(1rem, 6fr) 6rem",
      },
    },
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
