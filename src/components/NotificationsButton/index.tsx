import { createAvatarComponent, SrcSource, ValueSource } from 'react-avatar';

import styles from './NotificationsButton.module.scss';

const Avatar = createAvatarComponent({
  sources: [SrcSource, ValueSource],
});

export interface NotificationsButtonProps {
  imageSrc: string;
  name: string;
  quantity: number;
  title: string;
  onClick: () => void;
}

export function NotificationsButton({
  imageSrc,
  name,
  quantity,
  onClick,
  title,
}: NotificationsButtonProps): JSX.Element {
  return (
    <div className={styles.container}>
      <Avatar
        src={imageSrc}
        name={name}
        title={title || 'Notificações'}
        size="50"
        round="8px"
        color="#C4C4C4"
        className={styles.avatar}
        onClick={() => {
          onClick();
        }}
      />
      <i
        className={styles.notifications}
        draggable={false}
        data-length={quantity.toString().length}
      >
        {quantity > 99 ? '99+' : quantity}
      </i>
    </div>
  );
}
