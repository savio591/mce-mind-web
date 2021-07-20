import { Meta, Story } from '@storybook/react';

import { NotificationsButton, NotificationsButtonProps } from '.';

export default {
  title: 'Components/Button/Notification',
  component: NotificationsButton,
} as Meta;

const Template: Story<NotificationsButtonProps> = args => (
  <NotificationsButton {...args} />
);

export const Default = Template.bind({});
Default.args = { quantity: 4, name: 'Mind Coding' };

export const WithImage = Template.bind({});
WithImage.args = {
  quantity: 72,
  name: 'Mind Coding',
  imageSrc: 'https://github.com/savio591.png',
};

export const MoreThan99 = Template.bind({});
MoreThan99.args = {
  quantity: 201,
  name: 'Mind Coding',
  imageSrc: 'https://github.com/savio591.png',
};
