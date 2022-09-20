/* eslint-disable import/no-extraneous-dependencies */
const { rose } = require('tailwindcss/colors');

/** @type {import('tailwindcss/tailwind-config').TailwindTheme} */
module.exports = {
  fontFamily: {
    sans: ['Red Hat Display', 'sans-serif'],
  },
  extend: {
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
    },
    width: {
      screen: '100vw',
    },
    maxWidth: {
      screen: '100vw',
    },
    keyframes: {
      wiggle: {
        '0%, 50%, 100%': { transform: 'rotate(-1deg)' },
        '25%, 75%': { transform: 'rotate(1deg)' },
      },
    },
    animation: {
      wiggle: 'wiggle 0.5s ease-in-out',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    colors: {
      primary: rose,
    },
  },
};
