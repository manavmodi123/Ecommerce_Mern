/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slate-gray': '#d1d5db',
         customPink: '#fce3fe',
      },
    },
  },
  plugins: [],
}