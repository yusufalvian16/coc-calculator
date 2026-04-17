/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        supercell: ['SupercellMagic', 'sans-serif'],
      },
      colors: {
        // Design system — dark, minimal, elegant
        'app':        '#0f1117',   // page background
        'surface':    '#1a1d27',   // card/panel background
        'surface-2':  '#222636',   // elevated card
        'border':     '#2a2d3e',   // subtle border
        'muted':      '#6b7280',   // muted text
        'accent':     '#5b6af0',   // primary accent (indigo-blue)
        'accent-hover': '#4a58e0', // accent hover
        'accent-blue':  '#60a5fa', // light blue for labels
        'gold':       '#f59e0b',   // gold/amber for highlights
        'success':    '#22c55e',   // green
        'danger':     '#ef4444',   // red
        'epic':       '#a855f7',   // purple for epic items
        // Keep old names as aliases for JS-generated elements
        'coc-gold':   '#f59e0b',
        'coc-blue':   '#60a5fa',
        'coc-brown':  '#92400e',
        'coc-dark':   '#0f1117',
        'coc-card':   '#1a1d27',
        'coc-border': '#2a2d3e',
      },
    },
  },
  plugins: [],
}
