/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "whatsapp-green": "#48c81b",
        "wight-green": "#f5f5f5",
        "black-green": "#132A13",
        "table-row": "#C5D7C9",
        "tablerow-hover": "#DBF4E0",

        
        "Buttongreen": "#29bf12",

        dark: "#133d00",
        darkhover: "#3b562f",
        opacity: "#ACACAC",
      },

      fontFamily: {
        custom: ["Poppins"],
      },
    },
  },
  plugins: [],
};
