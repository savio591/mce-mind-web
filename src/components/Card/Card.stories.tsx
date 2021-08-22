import { Meta, Story } from '@storybook/react';

import { Card, CardProps } from '.';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    date: { control: 'date' },
  },
} as Meta;

const Template: Story<CardProps> = args => <Card {...args} />;

export const Default = Template.bind({});
export const WithDate = Template.bind({});
export const Small = Template.bind({});

Default.args = {
  // date: new Date(),
  name: 'Savio Castelo',
  phone: '+55 96 99112-3620',
  image: 'https://github.com/savio591.png',
};

WithDate.args = {
  date: new Date(1970, 0, 0, 8, 30, 0, 0),
  name: 'Savio Castelo',
  phone: '+55 96 99112-3620',
  image: 'https://github.com/savio591.png',
};

Small.args = {
  ...Default.args,
  phone: undefined,
  date: undefined,
  size: 'small',
};
