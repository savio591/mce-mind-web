import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/client';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { AuthBox } from '../components/AuthBox';

import styles from './Login.module.scss';
import logoImg from '../../public/images/logo.png';

export default function Home(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isShowedPassword, setIsShowedPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      setDisableButton(true);
      const signindata = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (!signindata?.ok) {
        throw new Error('errou');
      }
      router.push('/dashboard');
      toast.dark('Autenticado com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error('⚠️ Email e/ou senha inválido(a)', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // setEmail('');
      setPassword('');
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
          <Image src={logoImg} objectFit="contain" />
          <form onSubmit={handleSubmit}>
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
              autoFocus
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
              // showPassword={isShowedPassword}
              inputColorTheme="default"
              inputType="password"
              inputFontSize="16"
              value={password}
              label="Senha"
              minLength={8}
              required
            />
            <Link href="/recuperarsenha">
              <a data-align="left">
                <span>Esqueceu a senha?</span>
              </a>
            </Link>
            <Button isLoading={disableButton} type="submit">
              Login
            </Button>
          </form>
          <i>
            Não tem conta?{' '}
            <Link href="/cadastro">
              <a data-align="center">
                <span>Registrar</span>
              </a>
            </Link>
          </i>
        </AuthBox>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async req => {
  const session = await getSession(req);

  if (session?.user) {
    return {
      redirect: {
        destination: `/dashboard`,
      },
      props: { message: 'Redirecionando para o Dashboard' },
    };
  }
  return {
    props: { status: 200 },
  };
};
