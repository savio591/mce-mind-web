const path = require('path');

module.exports = {
  core: {
    builder: "webpack5",
  },
  
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    // {
    //   name: '@storybook/addon-docs',
    //   options: {
    //     configureJSX: true,
    //   },
    // },
    // '@storybook/preset-scss',
    // '@storybook/preset-typescript',
    // '@storybook/addon-actions',
    // '@storybook/addon-controls',
    "@storybook/addon-links",
    '@storybook/addon-essentials',
    // "@storybook/preset-create-react-app"
  ],
  presets: [path.resolve(__dirname, "./next-preset.js")],
};
