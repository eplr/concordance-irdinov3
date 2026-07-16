/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        c: {
          page: '#F8F6F0',
          card: '#183148',
          'card-dark': '#0f1e33',
          border: '#1f3a58',
          'text-page': '#183148',
          'text-muted': '#6b6050',
          'text-card': '#f0ebe2',
          'text-muted-card': '#a8a490',
          gold: '#BBA46B',
          'gold-dim': '#9a8654',
        },
        grade: {
          A: '#1ab394',
          B: '#52c277',
          C: '#e6be38',
          D: '#e8923a',
          E: '#b85a5a',
          F: '#a04545',
        },
        layer: { ok: '#1ab394', partial: '#e8923a', gap: '#b85a5a' },
        priority: { critical: '#b85a5a', high: '#e8923a', medium: '#e6be38', low: '#52c277' },
      },
      fontFamily: {
        sans: ['Karla', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
