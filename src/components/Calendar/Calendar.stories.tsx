import { Meta, Story } from '@storybook/react';

import { Calendar, CalendarProps } from './index';

export default {
  title: 'Controllers/Calendar',
  component: Calendar,
} as Meta;

const Template: Story<CalendarProps> = args => <Calendar {...args} />;

const now = '2021-08-02T11:15:00.000Z';

export const Default = Template.bind({});
Default.args = {
  availableDays: [
    new Date(2021, 7, 3).toISOString(),
    new Date(2021, 7, 5).toISOString(),
    new Date(2021, 7, 12).toISOString(),
    new Date(2021, 7, 16).toISOString(),
    new Date(2021, 7, 19).toISOString(),
    new Date(2021, 7, 21).toISOString(),
  ],
  selectedDate: now,
  refDate: now,
};

export const NoAvailableDays = Template.bind({});
NoAvailableDays.args = {
  availableDays: [],
  selectedDate: now,
  refDate: now,
};

export const Undefined = Template.bind({});
Undefined.args = undefined;
