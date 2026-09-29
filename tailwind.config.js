/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#16395B',
        teal: '#2D6A4F',
        sage: '#52B788',
        emerald: '#2D6A4F',
        hijauMuda: '#228B22',
        abu: '#f8f9fa',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['"Noto Sans Arabic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}