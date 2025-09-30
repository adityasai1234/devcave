/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "monospace"],
        space: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 1s ease-out",
        "bounce-slow": "bounce 2s infinite",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #000000 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0e4b99 100%)",
      },
    },
  },
  plugins: [],
};