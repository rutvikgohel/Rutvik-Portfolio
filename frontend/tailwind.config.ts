import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#030712',
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        accent: '#06B6D4',
        surface: '#0F172A',
        border: '#1E293B',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'aurora-1': 'radial-gradient(ellipse at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)',
        'aurora-2': 'radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
        'aurora-3': 'radial-gradient(ellipse at 50% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 60%)',
      },
      animation: {
        'aurora': 'aurora 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-in': 'fade-in 0.6s ease forwards',
        'slide-up': 'slide-up 0.6s ease forwards',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)', opacity: '0.7' },
          '33%': { transform: 'translate(3%, -3%) scale(1.05)', opacity: '1' },
          '66%': { transform: 'translate(-3%, 3%) scale(0.97)', opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 40px rgba(59, 130, 246, 0.3)',
        'glow-secondary': '0 0 40px rgba(139, 92, 246, 0.3)',
        'glow-accent': '0 0 40px rgba(6, 182, 212, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
