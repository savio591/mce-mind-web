import { Meta, Story } from '@storybook/react';

import { Calendar, CalendarProps } from './index';

export default {
  title: 'Controllers/Calendar',
  component: Calendar,
} as Meta;

const Template: Story<CalendarProps> = args => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  availableDays: [
    new Date(),
    new Date(2021, 7, 3),
    new Date(2021, 7, 5),
    new Date(2021, 7, 12),
    new Date(2021, 7, 16),
    new Date(2021, 7, 19),
    new Date(2021, 7, 21),
  ],
  selectedDate: new Date(),
};
