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
    function({ addUtilities }) {
      addUtilities({
        '.custom-scrollbar': {
          /* For Firefox */
          'scrollbar-width': 'thin',
          'scrollbar-color': '#C9C9C9 transparent',

          /* For Chrome, Safari, Edge */
          '&::-webkit-scrollbar': {
            'width': '8px'
          },
          '&::-webkit-scrollbar-track': {
            'background': 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            'backgroundColor': '#C9C9C9',
            'borderRadius': '20px',
            'border': '3px solid transparent',
            'backgroundClip': 'padding-box'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            'backgroundColor': '#a8a8a8'
          }
        }
      });
    }
]
}

