import { useState, useEffect } from 'react';
import { IconBaseProps } from 'react-icons';
import { FaBell, FaRegBell } from 'react-icons/fa';

import styles from './Notification.module.scss';

export type NotificationData = {
  name: string;
};

export interface NotificationProps {
  data: NotificationData[];
  setNotificationsRead?: () => void;
}

export function Notification({
  data,
  setNotificationsRead,
}: NotificationProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  const [clickedTimes, setClickedTimes] = useState(0);

  const [quantity, setQuantity] = useState(data?.length ?? 0);
  const iconOpts: IconBaseProps = {
    size: 24,
    style: { cursor: 'pointer' },
    color: '#3F4254',
  };

  useEffect(() => {
    if (clickedTimes === 1 && setNotificationsRead) {
      setNotificationsRead();
    }
  }, [clickedTimes, setNotificationsRead]);

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.notification}
        onClick={() => {
          setIsActive(!isActive);
          setQuantity(0);
          setClickedTimes(clickedTimes + 1);
        }}
      >
        {isActive ? <FaBell {...iconOpts} /> : <FaRegBell {...iconOpts} />}
      </button>
      {quantity > 0 && (
        <i
          className={styles.quantity}
          draggable={false}
          data-length={quantity.toString().length}
        >
          {quantity > 99 ? '99+' : quantity}
        </i>
      )}
      <ul
        className={styles.notificationsList}
        data-is-notificationslist-showed={isActive}
      >
        {data.map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
