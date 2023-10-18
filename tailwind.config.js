/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-background": "url('/hero-bg.png')",
        "main-background": "url('/main-bg.svg')",
      },
      fontFamily: {
        baloo: ["Baloo"],
      },
    },
  },
  plugins: [],
};
