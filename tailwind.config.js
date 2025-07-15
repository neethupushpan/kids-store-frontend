// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite/**/*.js', // ✅ Add this line
  ],
  theme: {
    extend: {
      colors: {
        ranipink: "#D6006F",
        beige: "#FFF4E6",
        
      },
    },
  },
   plugins: [
    require('flowbite/plugin') // ✅ Add Flowbite plugin
  ],
}
