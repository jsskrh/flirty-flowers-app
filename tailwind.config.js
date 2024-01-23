/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      syncopate: ["Syncopate", "sans-serif"],
      bai: ["Bai Jamjuree", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      bodoni: ["Bodoni Moda", "sans-serif"],
    },
    extend: {
      colors: { background: "#f5f0ec" },
    },
  },
  plugins: [],
};
