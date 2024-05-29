/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient_one': "linear-gradient(102deg, #c9e8e7 2.92%, #fff 100%)",
        'gradient_two': "linear-gradient(90deg, #beccff 0.03%, #c9e8e7 98.48%)",
        'gradient_three': "linear-gradient(354deg, #08aca6 24.93%, #04363d 68.75%)",
      },
      boxShadow:{
        'coverShadow':'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
      }
    },
  },
  plugins: [],
}