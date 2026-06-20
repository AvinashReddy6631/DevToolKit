/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        /* Monochromatic palette — Vercel/Linear inspired */
        zinc: {
          50:  '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          750: '#333338',
          800: '#27272a',
          850: '#1f1f22',
          900: '#18181b',
          925: '#111113',
          950: '#09090b',
        },
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.5rem',
        'lg': '0.625rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        /* Sharp, professional shadows — not glowy */
        'xs':   '0 1px 2px rgba(0,0,0,0.5)',
        'sm':   '0 1px 3px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.4)',
        'md':   '0 4px 6px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)',
        'lg':   '0 10px 15px rgba(0,0,0,0.5), 0 4px 6px rgba(0,0,0,0.3)',
        'inner-border': 'inset 0 0 0 1px rgba(255,255,255,0.06)',
        'focus': '0 0 0 2px #000, 0 0 0 4px rgba(255,255,255,0.3)',
        'button': '0 1px 2px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)',
        'button-hover': '0 2px 4px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card': '0 0 0 1px rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.4)',
        'card-hover': '0 0 0 1px rgba(255,255,255,0.1), 0 4px 8px rgba(0,0,0,0.5)',
        'dropdown': '0 8px 24px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)',
        'modal': '0 24px 64px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08)',
      },
      animation: {
        'fade-in':    'fadeIn 0.2s ease-out',
        'slide-up':   'slideUp 0.25s cubic-bezier(0.16,1,0.3,1)',
        'slide-down': 'slideDown 0.2s cubic-bezier(0.16,1,0.3,1)',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
