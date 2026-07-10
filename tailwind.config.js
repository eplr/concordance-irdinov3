/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        c: {
          black: '#0f1117',
          card: '#171b26',
          'card-hover': '#1e2436',
          border: '#252d40',
          'text-muted': '#7a869a',
          blue: '#60a5fa',
          'blue-light': '#93c5fd',
          'blue-dark': '#3b82f6',
        },
        grade: {
          A: '#22c55e',
          B: '#84cc16',
          C: '#eab308',
          D: '#f97316',
          E: '#ef4444',
          F: '#dc2626',
        },
        layer: {
          ok: '#22c55e',
          partial: '#f59e0b',
          gap: '#ef4444',
        },
        priority: {
          critical: '#ef4444',
          high: '#f97316',
          medium: '#eab308',
          low: '#84cc16',
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
