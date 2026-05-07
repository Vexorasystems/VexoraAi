import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:       '#030305',
        'ink-2':   '#050507',
        graphite:  '#0a0a0c',
        line:      'rgba(255, 255, 255, 0.06)',
        'line-strong': 'rgba(255, 255, 255, 0.12)',
        text: {
          DEFAULT: '#f5f5f7',
          2:       '#a8a8ad',
          3:       '#65656a',
        },
        signal: {
          green: '#6cf07a',
          amber: '#f0c264',
          blue:  '#6cb8f0',
          rose:  '#f06c8c',
        },
        chrome: {
          50:  '#e8eef6',
          100: '#c8d0d8',
          200: '#a8b4c7',
          300: '#7d8a9c',
        },
      },
      fontFamily: {
        sans:  ['var(--font-geist)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'serif'],
        mono:  ['var(--font-geist-mono)', 'JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        'mega-tight': '-0.04em',
        'tighter-2':  '-0.025em',
      },
      animation: {
        'pulse-soft': 'pulseSoft 1.6s ease-in-out infinite',
        'breathe':    'breathe 9s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'sheen':      'sheen 5s ease-in-out infinite',
        'spin-slow':  'spin 14s linear infinite',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 8px currentColor' },
          '50%':      { opacity: '0.4', boxShadow: '0 0 0px currentColor' },
        },
        breathe: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-3px)' },
        },
        sheen: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      transitionTimingFunction: {
        'cinema':  'cubic-bezier(0.65, 0, 0.35, 1)',
        'cinema-soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'lift':  '0 30px 80px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'glass': 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 30px 80px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        'xl-2': '28px',
      },
    },
  },
  plugins: [],
};

export default config;
