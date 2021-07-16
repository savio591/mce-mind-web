import { Meta, Story } from '@storybook/react';
import { FaList } from 'react-icons/fa';

import { Button, ButtonProps } from './index';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Entrar',
  size: 'default',
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  children: 'Carregando...',
  isLoading: true,
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  children: 'Disponível',
  size: 'small',
};

export const Outline = Template.bind({});
Outline.args = {
  ...Small.args,
  children: 'Não disponível',
  style: 'outline',
};

export const Icon = Template.bind({});
Icon.args = {
  children: <FaList size={35} />,
  type: 'icon',
};
