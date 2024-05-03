/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        120: '1.2',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to top, black, rgba(0, 0, 0, 0.7) 60%, transparent)',
      },
    },
  },
  variants: {
    extend: {
      scale: ['hover'],
      opacity: ['hover'],
    },
  },
  plugins: [],
}

