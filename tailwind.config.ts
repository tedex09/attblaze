import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        background: '#0f0f0f',
        foreground: '#ffffff',
        muted: '#1f1f1f',
        'muted-foreground': '#a1a1aa',
        primary: {
          DEFAULT: '#e50914',
          hover: '#f40612',
        },
        secondary: '#141414',
        text: {
          primary: '#ffffff',
          secondary: '#e5e5e5',
        },
      },
      borderRadius: {
        'card': '0.75rem',
        'modal': '12px',
        'full': '50%',
      },
      boxShadow: {
        'premium': '0 4px 12px rgba(0, 0, 0, 0.5)',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
      },
      animation: {
        'pulse-premium': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 300ms ease-in',
        'slide-up': 'slideUp 300ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;