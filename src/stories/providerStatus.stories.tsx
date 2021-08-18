import { Args, Meta, Story } from '@storybook/react';

import ProviderStatus, { ProviderStatusProps } from '../pages/dashboard/status';

export default {
  title: 'Pages/ProviderStatus',
  component: ProviderStatus,
} as Meta;

const Template: Story<ProviderStatusProps> = args => (
  <ProviderStatus {...args} />
);

const now = '2021-08-01T11:15:00.000Z';
// const yesterday = '2021-07-31T11:15:00.000Z';
const tomorrow = '2021-08-02T11:15:00.000Z';
// const distant = '2021-08-12T11:15:00.000Z';

export const Default = Template.bind({});
Default.args = {
  session: {
    email: 'savio591@hotmail.com',
    image: 'https://gdbrowser.com/icon/savio591&glow=0',
    name: 'Savio Castelo',
  },
  weeksData: [
    { weekDay: 'sunday', weekData: { isAvailable: false } },
    { weekDay: 'monday', weekData: { isAvailable: true } },
    { weekDay: 'tuesday', weekData: { isAvailable: true } },
    { weekDay: 'wednesday', weekData: { isAvailable: true } },
    { weekDay: 'thursday', weekData: { isAvailable: true } },
    { weekDay: 'friday', weekData: { isAvailable: true } },
    { weekDay: 'saturday', weekData: { isAvailable: false } },
  ],
};
