import { InputHTMLAttributes, useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { BiCheck } from 'react-icons/bi';

import styles from './Input.module.scss';

export interface InputProps
  extends Omit<InputHTMLAttributes<unknown>, 'className'> {
  inputColorTheme: 'default' | 'dark';
  inputFontSize: 14 | 16 | '14' | '16';
  inputType: 'default' | 'password';
  label?: string;
  isConfirmPassword?: boolean;
  currentPassword?: string;
  onInputValue: (value: string) => void;
  onPasswordButtonClick?: (passwordShown: boolean) => void;
  showPassword?: true | false;
}

export function Input({
  inputColorTheme,
  inputFontSize,
  inputType,
  label,
  onInputValue,
  onPasswordButtonClick,
  isConfirmPassword,
  currentPassword,
  showPassword,
  ...props
}: InputProps): JSX.Element {
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    setPasswordShown(!!showPassword);
  }, [showPassword]);

  function handleTogglePassword(): void {
    setPasswordShown(!passwordShown);
  }

  if (props.required && inputColorTheme === 'dark') {
    return (
      <label className={styles.container} htmlFor={label ?? inputType}>
        <input
          type="text"
          {...props}
          className={styles.input}
          data-font-size={inputFontSize}
          data-theme={inputColorTheme}
          onInput={event => {
            onInputValue(event.currentTarget.value);
          }}
        />

        <div
          role="status"
          className={styles.requiredIndicator}
          data-theme={inputColorTheme}
          onClick={handleTogglePassword}
          aria-hidden
        >
          <BiCheck size={12} />
        </div>
      </label>
    );
  }

  if (inputType === 'password') {
    return (
      <label className={styles.container} htmlFor={label ?? inputType}>
        <input
          {...props}
          type={passwordShown ? 'text' : 'password'}
          className={styles.input}
          data-font-size={inputFontSize}
          data-theme={inputColorTheme}
          onInput={event => {
            onInputValue(event.currentTarget.value);
            if (isConfirmPassword) {
              if (currentPassword === event.currentTarget.value) {
                event.currentTarget.setCustomValidity('');
                return;
              }
              event.currentTarget.setCustomValidity(
                'As senhas não coincidem. Verifique novamente'
              );
            }
          }}
        />
        <button
          type="button"
          className={styles.passwordButton}
          onClick={() => {
            handleTogglePassword();
            if (onPasswordButtonClick) {
              onPasswordButtonClick(passwordShown);
            }
          }}
          role="switch"
          aria-checked={passwordShown}
          aria-hidden
        >
          {passwordShown ? <FiEye /> : <FiEyeOff />}
        </button>
      </label>
    );
  }

  return (
    <input
      {...props}
      className={styles.input}
      data-font-size={inputFontSize}
      data-theme={inputColorTheme}
      onInput={event => {
        onInputValue(event.currentTarget.value);
      }}
    />
  );
}
