/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    container:{
      center: true,
    },
    extend: {
      colors:{
        "main":'#0aad0a'
      }
    },
  },
  plugins: [ flowbite.plugin(),],
}

