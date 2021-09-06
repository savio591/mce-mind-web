import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next/';
import { FormEvent, useState } from 'react';
import { toast, ToastOptions } from 'react-toastify';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { AuthBox } from '../components/AuthBox';

import styles from './Login.module.scss';
import { api } from '../services/api';
import { maskPhone } from '../utils/maskPhone';

export default function SignUp(): JSX.Element {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      setDisableButton(true);
      const unmaskPhone = phone.replace(/[() -]/g, '');
      const response = await api.post('create/provider', {
        name,
        email,
        phone: unmaskPhone,
        password,
      });

      if (response.status !== 201) {
        throw new Error('Usuário não criado!');
      }

      toast.dark('Conta criada com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push('/');
    } catch (err) {
      const toastOptions = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      } as ToastOptions;

      toast.error(
        '⚠️ Email e/ou Senha inválido, tente novamente!.',
        toastOptions
      );

      // setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>MCE Mind | Login</title>
        <meta name="description" content="Projeto MCE" />
        <link rel="image/png" href="/favicon.png" />
      </Head>

      <main className={styles.container}>
        <AuthBox>
          <h1>Cadastro</h1>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Nome e Sobrenome"
              onPasswordButtonClick={() => true}
              onInputValue={newValue => {
                setName(newValue);
                if (disableButton) {
                  setDisableButton(false);
                }
              }}
              inputColorTheme="default"
              autoComplete="name"
              inputType="default"
              inputFontSize="16"
              value={name}
              label="name"
              pattern="^([a-zA-Zâãêiouç]{1,}\s[a-zA-Zâãêiouç]{1,}'?-?[a-zA-Zâãêiouç]{1,}\s?([a-zA-Zâãêiouç]{1,})?)"
              required
              autoFocus
              type="text"
            />
            <Input
              placeholder="Telefone"
              onPasswordButtonClick={() => true}
              onInputValue={newValue => {
                setPhone(maskPhone(newValue, phone));
              }}
              inputColorTheme="default"
              autoComplete="tel"
              inputType="default"
              inputFontSize="16"
              minLength={11}
              maxLength={15}
              value={phone}
              label="phone"
              required
              type="tel"
            />
            <Input
              placeholder="Email"
              onPasswordButtonClick={() => true}
              onInputValue={newValue => {
                setEmail(newValue);
                if (disableButton) {
                  setDisableButton(false);
                }
              }}
              inputColorTheme="default"
              autoComplete="email"
              inputType="default"
              inputFontSize="16"
              value={email}
              label="Email"
              required
              type="email"
            />
            <Input
              placeholder="Senha"
              // onPasswordButtonClick={boolean => {
              //   // setIsShowedPassword(boolean);
              // }}
              onInputValue={newValue => {
                setPassword(newValue);
                if (disableButton) {
                  setDisableButton(false);
                }
              }}
              autoComplete="current-password"
              // showPassword={isShowedPassword}>
              inputColorTheme="default"
              inputType="password"
              inputFontSize="16"
              value={password}
              label="Senha"
              minLength={8}
              required
            />
            <Input
              placeholder="Confirmar senha"
              // onPasswordButtonClick={boolean => {
              //   // setIsShowedPassword(boolean);
              // }}
              onInputValue={newValue => {
                setConfirmPassword(newValue);
                if (disableButton) {
                  setDisableButton(false);
                }
              }}
              // showPassword={isShowedPassword}>
              inputColorTheme="default"
              inputType="password"
              inputFontSize="16"
              isConfirmPassword
              currentPassword={password}
              value={confirmPassword}
              label="confirmarSenha"
              minLength={8}
              required
            />

            <Button isLoading={disableButton} type="submit">
              Cadastrar
            </Button>
          </form>
          <i>
            Já tem conta?{' '}
            <Link href="/">
              <a data-align="center">
                <span>Fazer Login</span>
              </a>
            </Link>
          </i>
        </AuthBox>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { status: 200 },
  };
};
