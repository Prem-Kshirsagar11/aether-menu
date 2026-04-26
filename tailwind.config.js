/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-deep':       '#0a0906',
        'bg-card':       '#111009',
        'bg-card-hover': '#18160f',
        'gold':          '#c9a84c',
        'gold-light':    '#e8c97a',
        'gold-dim':      '#7a6330',
        'cream':         '#f0e8d8',
        'cream-muted':   '#a89880',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body:    ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}