import { Args, Meta, Story } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import Dashboard, { DashboardProps } from '../pages/dashboard';

export default {
  title: 'Pages/Dashboard',
  component: Dashboard,
  decorators: [withMock],
} as Meta;

const Template: Story<DashboardProps> = args => <Dashboard {...args} />;

const now = '2021-08-01T11:15:00.000Z';
// const yesterday = '2021-07-31T11:15:00.000Z';
const tomorrow = '2021-08-02T11:15:00.000Z';
// const distant = '2021-08-12T11:15:00.000Z';

export const Default = Template.bind({});
Default.args = {
  selectedDate: now,
  refDate: now,
  appointmentsData: [
    {
      id: 1,
      name: 'Jhonnys Santis',
      date: new Date(2021, 7, 4, 8, 15, 0).toISOString(),
    },
    {
      id: 2,
      name: 'Savio Castelo',
      date: new Date(2021, 7, 4, 9, 30, 0).toISOString(),
      image: 'https://github.com/savio591.png',
      phone: '+55 96 99112-3620',
    },
    {
      id: 3,
      name: 'Jhonnys Pereira',
      date: new Date(2021, 7, 4, 11, 30, 0).toISOString(),
      phone: '+55 11 99182-2910',
    },
    {
      id: 4,
      name: 'Junin Santos',
      date: new Date(2021, 7, 4, 14, 15, 0).toISOString(),
      phone: '+55 11 99182-2910',
    },
    {
      id: 5,
      name: 'Felipe Santoris',
      date: new Date(2021, 7, 4, 17, 30, 0).toISOString(),
      phone: '+55 11 99182-2910',
    },
    {
      id: 6,
      name: 'Juliana Janeckini',
      date: new Date(2021, 7, 4, 20, 0, 0).toISOString(),
      phone: '+55 11 99182-2910',
    },
    {
      id: 7,
      name: 'Fernando Mendes',
      date: new Date(2021, 7, 4, 22, 0, 0).toISOString(),
      phone: '+55 11 99182-2910',
    },
  ],
  calendarData: {
    availableDays: [
      new Date(2021, 7, 2).toISOString(),
      new Date(2021, 7, 5).toISOString(),
      new Date(2021, 7, 12).toISOString(),
      new Date(2021, 7, 16).toISOString(),
      new Date(2021, 7, 19).toISOString(),
      new Date(2021, 7, 21).toISOString(),
    ],
    selectedDate: tomorrow,
    refDate: now,
  },
};

export const NoAppointments = Template.bind({});
NoAppointments.args = {
  ...Default.args,
  appointmentsData: [],
  calendarData: { ...Default?.args?.calendarData, selectedDate: now },
} as Args;

// Mocking Next-auth
Default.parameters = {
  mockData: [
    {
      url: '/api/auth/session',
      method: 'GET',
      status: 200,
      response: {
        user: {
          name: 'Super Mario',
          isProvider: true,
          // image: 'https://gdbrowser.com/icon/savio591',
        },
      },
    },
  ],
};
