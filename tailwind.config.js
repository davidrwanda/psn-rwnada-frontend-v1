/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1A5F8E', // Blue from PSN logo
        'primary-dark': '#0D4D78',
        'primary-light': '#3A7FA8',
        'accent': '#E78E22', // Orange from PSN logo
        'accent-dark': '#CB7B1C',
        'accent-light': '#F5A945',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

