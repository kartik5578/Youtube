/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'custom-text': '#C1CCC7',
        'custom-green':'#02C173',
        'custom-bg' :'#2BFFFF',
      },
    },
  },
  plugins: [],
}



