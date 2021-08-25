import { Meta, Story } from '@storybook/react';

import { Notification, NotificationProps } from '.';

export default {
  title: 'Controllers/Notification',
  component: Notification,
} as Meta;

const Template: Story<NotificationProps> = args => (
  <div
    style={{
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'baseline',
      height: 124,
    }}
  >
    <Notification {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: [
    { name: 'Adam Smith reservou às 10h (29/06)' },
    { name: 'Adam Smith reservou às 11h (29/06)' },
    { name: 'Adam Smith reservou às 12h (29/06)' },
  ],
};
