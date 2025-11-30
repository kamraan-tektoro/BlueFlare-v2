/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arabic Font 2013', 'sans-serif'],
        arabic: ['Arabic Font 2013', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0B1120',
          navy: '#172554',
          blue: '#2563EB',
          light: '#60A5FA',
          glow: '#38BDF8',
          grey: '#94A3B8',
        }
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'ring-orbit': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ring-orbit': 'ring-orbit 10s linear infinite',
      }
    },
  },
  plugins: [],
}

