/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f4d9a8',
          300: '#ebbe6e',
          400: '#e0a03a',
          500: '#c7851f',
          600: '#a06518',
          700: '#7a4d15',
          800: '#543516',
          900: '#2e1d0e',
        },
        dark: {
          50:  '#f5f5f0',
          100: '#e8e8e0',
          800: '#1a1a16',
          900: '#0f0f0c',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
