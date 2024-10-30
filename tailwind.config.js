/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gaiaPurple: '#B908FF',
        tuGreen: '#7AC142',
      },
    }
  },
  plugins: [],
}

