import { createAvatarComponent, SrcSource, ValueSource } from 'react-avatar';

import styles from './NotificationsButton.module.scss';

const Avatar = createAvatarComponent({
  sources: [SrcSource, ValueSource],
});

export interface NotificationsButtonProps {
  quantity: number;
  name: string;
  imageSrc: string;
  onClick: () => void;
}

export function NotificationsButton({
  quantity,
  onClick,
  imageSrc,
  name,
}: NotificationsButtonProps): JSX.Element {
  return (
    <div className={styles.container}>
      {/* <button
        type="button"
        onClick={() => {
          onClick();
        }}
      /> */}
      <Avatar
        src={imageSrc}
        name={name}
        title="Notificações"
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
