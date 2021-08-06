import { Meta, Story } from '@storybook/react';

import { WeekDayPick, WeekDayPickProps } from '.';

export default {
  title: 'Components/WeekDayPick',
  component: WeekDayPick,
  argTypes: {
    setWeekData: { action: 'Week Pick Data' },
  },
} as Meta;

const Template: Story<WeekDayPickProps> = args => <WeekDayPick {...args} />;

export const Default = Template.bind({});
export const NotAvailable = Template.bind({});

Default.args = {
  weekDay: 'sunday',
  weekData: {
    isAvailable: true,
  },
};

NotAvailable.args = {
  ...Default.args,
  weekData: {
    isAvailable: false,
  },
};
