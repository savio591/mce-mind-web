import { Story } from '@storybook/react';
import '../src/styles/globals.scss';
import '../src/components/Calendar/_calendar.scss';

export const parameters = {
  actions: {
    argTypesRegex: () => {
      return '^on[A-Z].*';
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
