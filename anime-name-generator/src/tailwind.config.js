/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      colors: {
        sakura: '#ffe4ec',
        petal: '#ffb6c1',
        bubble: '#fcd5ce',
        darkText: '#5c5c5c'
      },
      fontFamily: {
        anime: ['"Zen Maru Gothic"', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        pop: 'pop 0.3s ease'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        pop: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}
  