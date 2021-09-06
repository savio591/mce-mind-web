import { ReactNode } from 'react';

import styles from './Button.module.scss';

export interface ButtonProps {
  children?: ReactNode;
  size?: 'default' | 'small';
  style?: 'default' | 'outline' | 'circle' | 'circle-outline';
  type?: 'default' | 'icon' | 'submit';
  isLoading?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  size,
  style,
  type,
  isLoading,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      data-size={size ?? 'default'}
      data-style={style ?? 'default'}
      data-type={type === 'submit' ? 'default' : type ?? 'default'}
      className={styles.button}
      onClick={event => {
        if (onClick) {
          event.preventDefault();
          onClick();
        }
      }}
      disabled={isLoading ?? false}
    >
      {children}
    </button>
  );
}
