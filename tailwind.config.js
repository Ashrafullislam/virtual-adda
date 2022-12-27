/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        cupcake: {
        
          "primary": "#2772db",
                  
          "secondary": "#070f4e",
                  
          "accent": "#3ab1c8",
                  
          "neutral": "#3D4451",
                  
          "base": "#fffff",
                  
          "info": "#90f6d7",

          "success": "#36D399",

           "warning":"#f5ebeb",    
                                
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
  //...
}  