/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Meta, Story } from '@storybook/react';

import { Input } from '../Input';
import { AuthBox, AuthBoxProps } from '.';

import { Button } from '../Button';

export default {
  title: 'Controllers/AuthBox',
  component: AuthBox,
} as Meta<AuthBoxProps>;

const Template: Story<AuthBoxProps> = args => <AuthBox {...args} />;

const children = (
  <>
    <img src="/static/media/src/assets/logo..png" alt="Logo" width={165} />
    <form>
      <Input
        placeholder="Email"
        onPasswordButtonClick={() => true}
        onInputValue={() => 'void'}
        inputFontSize="16"
        inputColorTheme="default"
        inputType="default"
        label="Email"
      />
      <Input
        placeholder="Senha"
        onPasswordButtonClick={() => true}
        onInputValue={() => 'void'}
        inputFontSize="16"
        inputColorTheme="default"
        inputType="password"
        label="Senha"
      />
      <Link href="/recuperarsenha">
        <a data-align="left">
          <span>Esqueceu a senha?</span>
        </a>
      </Link>
      <Button>Login</Button>
    </form>
    <i>
      Não tem conta?{' '}
      <Link href="/recuperarsenha">
        <a data-align="center">
          <span>Registrar</span>
        </a>
      </Link>
    </i>
  </>
);

export const Default = Template.bind({});
Default.args = {
  children,
};
