import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { ChangeEvent, useEffect } from 'react';
import { FormEvent, useState } from 'react';
import Avatar from 'react-avatar';
import { FaChevronLeft } from 'react-icons/fa';
import { toast, ToastOptions } from 'react-toastify';

import { AuthBox } from '../components/AuthBox';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { api } from '../services/api';
import { uploadImage } from '../services/uploadImage';
import { maskPhone } from '../utils/maskPhone';
import styles from './Perfil.module.scss';

type User =
  | {
      name: string;
      email: string;
      image: string;
      phone: string;
    }
  | undefined
  | null;

type Session = [
  session:
    | {
        secret: string;
        user: User;
      }
    | undefined
    | null,
  loading: boolean
];

export default function Profile(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  // const [oldPassword, setOldPassword] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [session, loading] = useSession() as Session;
  const router = useRouter();

  useEffect(() => {
    setName(session?.user?.name ?? '');
    setEmail(session?.user?.email ?? '');
    setImage(session?.user?.image ?? '');
    setPhone(session?.user?.phone ?? '');
  }, [
    session?.user?.email,
    session?.user?.image,
    session?.user?.name,
    session?.user?.phone,
  ]);

  if (loading) {
    return <pre>Carregando...</pre>;
  }

  if (!session?.user ?? session === null) {
    router.push('/');
    return <pre>Não logado</pre>;
  }

  const { secret } = session;

  async function handleUploadPhoto(
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    try {
      if (e.target.files === null) {
        throw new Error('Error on parse file sending');
      }
      const file = e.target.files[0];
      const filename = encodeURIComponent(file.name);
      const response = await uploadImage(file, filename);
      setImage(response.secure_url);
      await api.put(
        'profile',
        {
          image: response.secure_url,
        },
        { headers: { Authorization: `Bearer ${secret}` } }
      );
    } catch {
      const toastOptions = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      } as ToastOptions;
      toast.error('⚠️ Erro ao fazer upload da foto.', toastOptions);
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      setDisableButton(true);
      const unmaskPhone = phone.replace(/[() -]/g, '');
      await api.put(
        'profile',
        {
          name,
          email,
          phone: unmaskPhone,
          password: password.length > 0 ? password : undefined,
        },
        { headers: { Authorization: `Bearer ${secret}` } }
      );

      toast.dark('Dados alterados com sucesso!', {
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

      toast.error('⚠️ Essa conta já existe, tente fazer login.', toastOptions);

      // setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  }

  return (
    <div className={styles.container}>
      <AuthBox>
        <div className={styles.header}>
          <FaChevronLeft
            onClick={() => {
              router.back();
            }}
            style={{ cursor: 'pointer' }}
            size={20}
          />
          <h1>Editar perfil</h1>
        </div>
        <input
          onChange={handleUploadPhoto}
          type="file"
          accept="image/png, image/jpeg"
          ref={fileInputRef}
          hidden
        />
        <button
          type="button"
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <Avatar
            name={(name || session?.user?.name) ?? ''}
            src={image}
            // style={{ borderRadius: 100 }}
            round
            // unstyled
          />
          <div style={{ width: 1, height: 1, backgroundColor: '#000000' }} />
        </button>
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
            inputFontSize="14"
            value={name}
            label="name"
            pattern="^([a-zA-Zâãêiouç]{1,}\s[a-zA-Zâãêiouç]{1,}'?-?[a-zA-Zâãêiouç]{1,}\s?([a-zA-Zâãêiouç]{1,})?)"
            autoFocus
            required
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
            inputFontSize="14"
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
            inputFontSize="14"
            value={email}
            label="Email"
            required
            type="email"
          />
          <Input
            placeholder="Nova senha"
            // onPasswordButtonClick={boolean => {
            //   // setIsShowedPassword(boolean);
            // }}
            onInputValue={newValue => {
              setPassword(newValue);
              if (disableButton) {
                setDisableButton(false);
              }
            }}
            autoComplete="none"
            // showPassword={isShowedPassword}>
            inputColorTheme="default"
            inputType="password"
            inputFontSize="14"
            value={password}
            label="Senha"
            minLength={8}
            required={password.length > 0}
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
            inputFontSize="14"
            isConfirmPassword
            currentPassword={password}
            value={confirmPassword}
            label="confirmarSenha"
            minLength={8}
            required={password.length > 0}
          />
          {/* <Input
            placeholder="Senha atual"
            // onPasswordButtonClick={boolean => {
            //   // setIsShowedPassword(boolean);
            // }}
            onInputValue={newValue => {
              setOldPassword(newValue);
              if (disableButton) {
                setDisableButton(false);
              }
            }}
            // showPassword={isShowedPassword}>
            inputColorTheme="default"
            inputType="password"
            autoComplete="none"
            inputFontSize="14"
            value={oldPassword}
            label="senha atual"
            minLength={8}
            required
          /> */}

          <Button isLoading={disableButton} type="submit">
            Salvar
          </Button>
        </form>
      </AuthBox>
    </div>
  );
}
