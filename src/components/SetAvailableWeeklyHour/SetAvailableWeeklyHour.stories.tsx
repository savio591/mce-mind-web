import { Meta, Story } from '@storybook/react';

import { SetAvailableWeeklyHour, SetAvailableWeeklyHourProps } from '.';

export default {
  title: 'Controllers/SetAvailableWeeklyHour',
  component: SetAvailableWeeklyHour,
  argTypes: {
    setRequestWeekData: {
      action: 'Request Week Data',
    },
  },
} as Meta;

const Template: Story<SetAvailableWeeklyHourProps> = args => (
  <SetAvailableWeeklyHour {...args} />
);

export const Default = Template.bind({});
Default.args = {
  serverWeeksData: [
    { weekDay: 'sunday', weekData: { isAvailable: false } },
    { weekDay: 'monday', weekData: { isAvailable: true } },
    { weekDay: 'tuesday', weekData: { isAvailable: true } },
    { weekDay: 'wednesday', weekData: { isAvailable: true } },
    { weekDay: 'thursday', weekData: { isAvailable: true } },
    { weekDay: 'friday', weekData: { isAvailable: true } },
    { weekDay: 'saturday', weekData: { isAvailable: false } },
  ],
};
