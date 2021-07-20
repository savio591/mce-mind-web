import { ReactNode } from 'react';

import styles from './Button.module.scss';

export interface ButtonProps {
  children: ReactNode;
  size?: 'default' | 'small';
  style?: 'default' | 'outline';
  type?: 'default' | 'icon';
  isLoading?: boolean;
  onClick: () => void;
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
      type="button"
      data-size={size ?? 'default'}
      data-style={style ?? 'default'}
      data-type={type ?? 'default'}
      className={styles.button}
      onClick={() => {
        onClick();
      }}
      disabled={isLoading ?? false}
    >
      {children}
    </button>
  );
}
