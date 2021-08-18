import { useState, useEffect } from 'react';
import {
  NotificationsButton,
  NotificationsButtonProps,
} from '../NotificationsButton';

import styles from './Notifications.module.scss';

export type NotificationsData = {
  name: string;
};

export interface NotificationsProps extends NotificationsButtonProps {
  align: 'left' | 'right';
  notificationsData: NotificationsData[];
  showNotifications: boolean;
  isStorybookTesting?: boolean;
  onBlur: () => void;
}

export function Notifications({
  align,
  imageSrc,
  name,
  quantity,
  title,
  notificationsData,
  showNotifications,
  isStorybookTesting,
  onBlur,
}: NotificationsProps): JSX.Element {
  const [isNotificationsListShowed, setIsNotificationsListShowed] =
    useState<boolean>(false);

  useEffect(() => {
    setIsNotificationsListShowed(showNotifications);
  }, [showNotifications]);

  function handleButtonClick(): void {
    setIsNotificationsListShowed(!isNotificationsListShowed);
  }

  return (
    <div
      className={styles.container}
      onBlur={() => {
        onBlur();
      }}
      data-is-storybook-testing={isStorybookTesting}
    >
      <NotificationsButton
        imageSrc={imageSrc}
        name={name}
        quantity={quantity}
        title={title}
        onClick={() => {
          handleButtonClick();
        }}
      />
      <ul
        className={styles.notificationsList}
        data-is-notificationslist-showed={isNotificationsListShowed}
        data-notifications-list-align={align || 'left'}
      >
        {notificationsData.map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
