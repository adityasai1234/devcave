/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0e0a',
        surface: '#0d140d',
        border: 'rgba(0, 255, 100, 0.12)',
        'border-focus': 'rgba(0, 255, 100, 0.35)',
        text: '#e8e4dc',
        muted: 'rgba(0, 255, 100, 0.4)',
        green: '#00ff64',
        cyan: 'rgba(0, 200, 255, 0.85)',
        yellow: '#e8c46a',
        red: '#ff5f57',
        orange: '#ff9f0a',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': '10px',
        xs: '11px',
        sm: '12px',
      },
      spacing: {
        '2.5': '10px',
      },
    },
  },
  plugins: [],
}
