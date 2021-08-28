import { Args, Meta, Story } from '@storybook/react';
import { Provider } from 'next-auth/client';
import withMock from 'storybook-addon-mock';

import { Header, HeaderProps } from '.';
import { providerLoggedResponse } from '../../__tests__/__mocks__/requestMock';

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [withMock],
} as Meta;

const Template: Story<HeaderProps> = args => {
  const { session } = args;
  return (
    <Provider session={session}>
      <Header {...args} />
    </Provider>
  );
};

export const Default = Template.bind({});

Default.args = {
  session: providerLoggedResponse,
} as Args;

// Mocking Next-auth
Default.parameters = {
  mockData: [
    {
      url: '/api/auth/session',
      method: 'GET',
      status: 200,
      response: providerLoggedResponse,
    },
  ],
};
