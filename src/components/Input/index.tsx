import { InputHTMLAttributes, useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { BiCheck } from 'react-icons/bi';

import styles from './Input.module.scss';

export interface InputProps
  extends Omit<InputHTMLAttributes<unknown>, 'className'> {
  inputColorTheme: 'default' | 'dark';
  inputFontSize: 14 | 16 | '14' | '16';
  inputType: 'default' | 'password';
  onInputValue: (value: string) => string;
  onPasswordButtonClick: (passwordShown: boolean) => boolean;
  showPassword?: true | false;
}

export function Input({
  inputColorTheme,
  inputFontSize,
  inputType,
  onInputValue,
  onPasswordButtonClick,
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
      <div className={styles.container}>
        <input
          {...props}
          type="text"
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
      </div>
    );
  }

  if (inputType === 'password') {
    return (
      <div className={styles.container}>
        <input
          {...props}
          type={passwordShown ? 'text' : 'password'}
          className={styles.input}
          data-font-size={inputFontSize}
          data-theme={inputColorTheme}
          onInput={event => {
            onInputValue(event.currentTarget.value);
          }}
        />
        <button
          type="button"
          className={styles.passwordButton}
          onClick={() => {
            handleTogglePassword();
            onPasswordButtonClick(passwordShown);
          }}
          role="switch"
          aria-checked={passwordShown}
          aria-hidden
        >
          {passwordShown ? <FiEye /> : <FiEyeOff />}
        </button>
      </div>
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
