/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // primary:"rgb(44,241,223)",
        // secondary:"rgb(62,186,172)",
      }
    },
    screens: {
      'lg': {max:'2024px'},

      'sm': {max:'1000px'},
    }
  },
  plugins: [],
}

