const tailwindConf = require('config/tailwind.config');

module.exports = {
  ...tailwindConf,
  plugins: [...tailwindConf.plugins, require('daisyui')],
  daisyui: {
    themes: {
      light: {
        ...require('daisyui/src/colors/themes')['[data-theme=light]'],
        primary: '#F43F5E',
        'base-100': '#FAFAF9',
        'base-300': '#D6D3D1',
        'base-content': '#1C1917',
      },
    },
  },
};
