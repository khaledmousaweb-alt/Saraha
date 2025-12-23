/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2c2e2a', // MindMarket Charcoal
          light: '#3f413d',
        },
        accent: {
          DEFAULT: '#06b6d4',
          hover: '#0891b2',
        },
        surface: {
          DEFAULT: '#f5f1e4', // MindMarket Beige
          dim: '#e0dbce',
          accent: '#c2bcad',
        },
        charcoal: '#2c2e2a',
        beige: {
          DEFAULT: '#f5f1e4',
          accent: '#e0dbce',
          dark: '#c2bcad',
        },
      },
      borderRadius: {
        DEFAULT: '8px',
        large: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
        full: '9999px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
