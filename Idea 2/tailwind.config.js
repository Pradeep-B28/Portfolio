/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        observatory: { ink: '#070a12', panel: '#0d1320', signal: '#67e8f9', violet: '#c4b5fd', solar: '#fbbf24' },
      },
      boxShadow: {
        glow: '0 0 30px rgba(103, 232, 249, 0.18)',
        'glow-violet': '0 0 30px rgba(196, 181, 253, 0.16)',
      },
    },
  },
  plugins: [],
};
