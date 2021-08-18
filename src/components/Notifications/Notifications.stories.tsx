import { Meta, Story } from '@storybook/react';

import { Notifications, NotificationsProps } from '.';

export default {
  title: 'Controllers/Notifications',
  component: Notifications,
} as Meta;

const Template: Story<NotificationsProps> = args => <Notifications {...args} />;

export const Default = Template.bind({});
Default.args = {
  quantity: 4,
  name: 'Mind Coding',
  title: 'Notifications',
  notificationsData: [
    { name: 'Adam Smith reservou às 10h (29/06)' },
    { name: 'Adam Smith reservou às 11h (29/06)' },
    { name: 'Adam Smith reservou às 12h (29/06)' },
  ],
  isStorybookTesting: true,
};

export const Opened = Template.bind({});
Opened.args = {
  ...Default.args,
  align: 'right',
  showNotifications: true,
};
