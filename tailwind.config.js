module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'garamond': ['"Instrument Serif"', 'serif'],
        'sans': ['"Instrument Serif"', 'serif'],
        'serif': ['"Instrument Serif"', 'serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(30%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(30%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
      animation: {
        'marquee': 'marquee 10s linear infinite',
        'marquee-reverse': 'marquee-reverse 13s linear infinite',
      }
    },
  },
  plugins: [],
}
