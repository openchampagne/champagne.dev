module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'garamond': ['"ITC Garamond Std Light Condensed"', 'serif'],
        'sans': ['"ITC Garamond Std Light Condensed"', 'serif'],
        'serif': ['"ITC Garamond Std Light Condensed"', 'serif'],
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
  variants: {
    extend: {},
  },
  corePlugins: {
    // ...
  },
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
}