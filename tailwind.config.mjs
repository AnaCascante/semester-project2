/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mjs}',
    './src/**/*.{html,js,css}',
  ],
  theme: {
    extend: {
      fontFamily: {
        merienda: ['Merienda', 'cursive'],
        trirong: ['Trirong', 'serif'],
        units: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
