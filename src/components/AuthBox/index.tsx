import { ReactNode } from 'react';
import styles from './authBox.module.scss';

export interface AuthBoxProps {
  children: ReactNode;
  isStorybookStory?: boolean;
}

export function AuthBox({
  children,
  isStorybookStory,
}: AuthBoxProps): JSX.Element {
  return (
    <div
      className={styles.container}
      data-is-testing={isStorybookStory ?? false}
    >
      {children}
    </div>
  );
}
