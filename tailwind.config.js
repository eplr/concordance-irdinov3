/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        c: {
          black: '#0c1929',
          card: '#132238',
          'card-hover': '#0e1c33',
          border: '#1c3050',
          'text-muted': '#7da5c5',
          blue: '#4a90d4',
          'blue-light': '#7ab8e8',
          'blue-dark': '#2e6cb0',
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
