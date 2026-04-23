/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07070f',
        surface: '#0e0e1a',
        card: '#13131f',
        accent: '#7c6aff',
        accent2: '#a78bfa',
        muted: '#6b6b8a',
        text: '#e8e8f0',
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
