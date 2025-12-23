/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-cream': '#FDF8F1',
        'brand-terracotta': '#D97757',
        'brand-mustard': '#F9E6B0',
        'brand-teal': '#6B8E8E',
        'brand-dark': '#3D2B1F',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}