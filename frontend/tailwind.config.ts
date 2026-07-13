import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        peach: 'var(--peach)',
        border: 'var(--border)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px var(--shadow-color)',
        'warm-md': '0 8px 24px var(--shadow-color)',
        'warm-lg': '0 16px 40px var(--shadow-color)',
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease forwards',
        'slide-up': 'slide-up 0.6s ease forwards',
        'marquee-slow': 'marquee 40s linear infinite',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
