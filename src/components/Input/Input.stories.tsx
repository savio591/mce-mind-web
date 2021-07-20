import { Meta, Story } from '@storybook/react';

import { Input, InputProps } from '.';

export default {
  title: 'Components/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = args => <Input {...args} />;

export const Default = Template.bind({});
Default.args = { placeholder: 'Placeholder' };

export const Required = Template.bind({});
Required.args = { ...Default.args, required: true, autoFocus: true };

export const RequiredDark = Template.bind({});
RequiredDark.args = {
  ...Default.args,
  required: true,
  autoFocus: true,
  inputColorTheme: 'dark',
};

export const Password = Template.bind({});
Password.args = {
  ...Required.args,
  inputType: 'password',
  defaultValue: 'passwordhere',
};

export const DefaultFontSmall = Template.bind({});
DefaultFontSmall.args = {
  ...Default.args,
  inputFontSize: '14',
};
