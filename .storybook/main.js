const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },

  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  presets: [path.resolve(__dirname, './next-preset.js')],
};
