module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    neumorphismSize: {
      xs: '0.05em',
      sm: '0.1em',
      default: '0.2em',
      lg: '0.4em',
      xl: '0.8em',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-filter-utilities'),require('tailwindcss-neumorphism')],
}
