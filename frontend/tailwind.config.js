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
        'slide-down': 'slideDown 1s ease',
      },
      keyframes: {
        'text-slide': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
    },
  },
  plugins: [],
}
