/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        c: {
          black: '#101e32',
          card: '#183148',
          'card-hover': '#0e1828',
          border: '#1f3a58',
          'text-muted': '#a8a490',
          gold: '#BBA46B',
          'gold-light': '#d4c08e',
          'gold-dark': '#9a8654',
        },
        grade: {
          A: '#1ab394',
          B: '#52c277',
          C: '#e6be38',
          D: '#e8923a',
          E: '#d4555a',
          F: '#b93535',
        },
        layer: {
          ok: '#1ab394',
          partial: '#e8923a',
          gap: '#d4555a',
        },
        priority: {
          critical: '#d4555a',
          high: '#e8923a',
          medium: '#e6be38',
          low: '#52c277',
        },
      },
      fontFamily: {
        sans: ['Karla', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
