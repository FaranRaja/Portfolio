/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f3f3f1', // Linktree Sand (Light Mode Base)
        surface: '#ffffff', // White
        card: '#e9c0e9', // Linktree Pink/Lilac
        border: '#1e2330', // Charcoal
        accent: '#d2e823', // Linktree Neon Yellow
        accent2: '#254f1a', // Linktree Deep Green
        text: '#1e2330', // Charcoal/Black
        'text-light': '#ffffff', // White
      },
      fontFamily: {
        // Linktree uses a very bold sans-serif, let's use Inter but boldest weights
        display: ['"Inter"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
