/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({addUtilities}){
      const newUtilities ={
        ".scrollbar-thin":{
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(31 29 29) white"
        },
        ".scrollvar-webkit":{
          "&::-webkit-scrollbar":{
            width: "10px"
          },
          "&::-webkit-scrollbar-thumb":{
            backgroundColor: "rgb(31 29 29)",
            borderRadius: "4px"
          }, 
          "&::-webkit-scrollbar-track":{
            backgroundColor: "white",
            borderRadius: "4px"
          }
        }
      }
      addUtilities(newUtilities, ["responsive", "hover"])
    }
  ]
}