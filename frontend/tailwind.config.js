/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'text-slide': 'text-slide 12s linear forwards',
      },
      keyframes: {
        'text-slide': {
          '0%': { transform: 'translateX(0%)' },
          '100%' : {transform: 'translateX(-100%)'},
        },
      },
    },
  },
  plugins: [],
}
