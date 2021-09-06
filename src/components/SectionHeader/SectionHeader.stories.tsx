import { Meta, Story } from '@storybook/react';

import { SectionHeader, SectionHeaderProps } from '.';

export default {
  title: 'Components/SectionHeader',
  component: SectionHeader,
  argTypes: {
    date: {
      control: { type: 'text', length: 24 },
    },
    refDate: {
      control: { type: 'text', length: 24 },
    },
  },
} as Meta;

const Template: Story<SectionHeaderProps> = args => <SectionHeader {...args} />;
const now = '2021-08-01T11:15:00.000Z';
const yesterday = '2021-07-31T11:15:00.000Z';
const tomorrow = '2021-08-02T11:15:00.000Z';
const distant = '2021-08-12T11:15:00.000Z';

export const Today = Template.bind({});
Today.args = {
  title: 'Dashboard',
  date: now,
  refDate: now,
  anchor: {
    name: 'Editar disponibilidade',
    link: './',
  },
};

export const Tomorrow = Template.bind({});
Tomorrow.args = { ...Today.args, date: tomorrow };

export const Yesterday = Template.bind({});
Yesterday.args = { ...Today.args, date: yesterday };

export const Distant = Template.bind({});
Distant.args = { ...Today.args, date: distant };

export const PrimaryHeaderAndAnchorOnly = Template.bind({});
PrimaryHeaderAndAnchorOnly.args = {
  title: 'Editar disponibilidade',
  anchor: { name: 'Voltar para Dashboard', link: './' },
};

export const PrimaryHeaderOnly = Template.bind({});
PrimaryHeaderOnly.args = { title: 'Sobre' };
