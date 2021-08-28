import { Meta, Story } from '@storybook/react';

import { Appointments, AppointmentsProps } from '.';

export default {
  title: 'Controllers/Appointments',
  component: Appointments,
} as Meta;

const Template: Story<AppointmentsProps> = args => <Appointments {...args} />;

export const Default = Template.bind({});
Default.args = {
  appointmentsData: [
    {
      id: 1,
      name: 'Jhonnys Santis',
      startDate: new Date(2021, 7, 4, 8, 15, 0).toISOString(),
    },
    {
      id: 2,
      name: 'Savio Castelo',
      startDate: new Date(2021, 7, 4, 9, 30, 0).toISOString(),
      image: 'https://github.com/savio591.png',
      phone: '+55 96 99112-3620',
    },
    {
      id: 3,
      name: 'Jhonnys Pereira',
      startDate: new Date(2021, 7, 4, 11, 30, 0).toISOString(),
      phone: '+55 11 99182-2910',
    },
    {
      id: 4,
      name: 'Junin Santos',
      startDate: new Date(2021, 7, 4, 14, 15, 0).toISOString(),
      phone: '+55 11 99182-2910',
    },
    {
      id: 5,
      name: 'Felipe Santoris',
      startDate: new Date(2021, 7, 4, 17, 30, 0).toISOString(),
      phone: '+55 11 99182-2910',
    },
    {
      id: 6,
      name: 'Juliana Janeckini',
      startDate: new Date(2021, 7, 4, 20, 0, 0).toISOString(),
      phone: '+55 11 99182-2910',
    },
    {
      id: 7,
      name: 'Fernando Mendes',
      startDate: new Date(2021, 7, 4, 22, 0, 0).toISOString(),
      phone: '+55 11 99182-2910',
    },
  ],
  refDate: new Date(2021, 7, 4, 9, 0, 0).toISOString(),
};

export const NoAppointments = Template.bind({});
NoAppointments.args = {
  appointmentsData: [],
};

export const AppointmentsUndefined = Template.bind({});
AppointmentsUndefined.args = {
  appointmentsData: undefined,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  isLoading: true,
};
