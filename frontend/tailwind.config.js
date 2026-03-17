/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          '50': '#f0fdf4',
          '500': '#10b981',
          '600': '#059669',
        }
      }
    },
  },
  plugins: [],
}
