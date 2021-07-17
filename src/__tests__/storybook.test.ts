import initStoryshots from '@storybook/addon-storyshots';

describe('Components: storybook tests', () => {
  initStoryshots({
    configPath: './.storybook',
    framework: 'react',
  });
});
