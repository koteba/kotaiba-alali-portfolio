import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#071426',
          soft: '#0D2238',
          line: '#1D3852',
        },
        paper: {
          DEFAULT: '#F5F8FB',
          soft: '#EAF1F6',
          line: '#D5E1EA',
        },
        signal: {
          indigo: '#2563EB',
          violet: '#0F766E',
          rose: '#14B8A6',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        arabic: ['var(--font-plex-arabic)', 'sans-serif'],
      },
      backgroundImage: {
        'bridge-gradient': 'linear-gradient(115deg, #1D4ED8 0%, #0F766E 58%, #F59E0B 100%)',
        'bridge-gradient-soft': 'linear-gradient(115deg, rgba(37,99,235,0.14) 0%, rgba(15,118,110,0.12) 58%, rgba(245,158,11,0.14) 100%)',
        'bridge-gradient-radial': 'radial-gradient(120% 120% at 15% 0%, rgba(37,99,235,0.22) 0%, rgba(7,20,38,0) 55%), radial-gradient(120% 120% at 90% 30%, rgba(20,184,166,0.16) 0%, rgba(7,20,38,0) 55%)',
      },
      boxShadow: {
        glow: '0 0 70px -12px rgba(15, 118, 110, 0.48)',
        'glow-sm': '0 0 30px -8px rgba(37, 99, 235, 0.42)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-18px) translateX(10px)' },
        },
        'float-slower': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(16px) translateX(-14px)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'float-slower': 'float-slower 13s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
