import { useMemo, useState, useCallback, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/client';
import { format, parseISO } from 'date-fns';
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Spinner from 'react-loading-skeleton';
import Avatar from 'react-avatar';

import { Notification } from '../Notification';
import styles from './Header.module.scss';
import { api } from '../../services/api';

type Session = [
  session: { user?: { email: string; name: string; image?: string | null } },
  loading: boolean
];

export interface HeaderProps {
  // eslint-disable-next-line react/no-unused-prop-types
  session?: Session[0];
}

export type NotificationsData = { clientName: string; startDate: string }[];

// eslint-disable-next-line no-empty-pattern
export function Header({}: HeaderProps): JSX.Element {
  const [session, loading] = useSession();
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationsData>(
    [] as NotificationsData
  );
  const formattedNotifications = useMemo(
    () =>
      notifications.map(item => ({
        name: `${item.clientName} marcou um agendamento para às ${format(
          parseISO(item.startDate),
          "hh'h'mm' no dia 'dd/MM"
        )}`,
      })),
    [notifications]
  );
  const fetchNotifications = useCallback(async () => {
    if (session && !loading) {
      try {
        const response = await api.get('notifications', {
          headers: { Authorization: `Bearer ${session?.secret}` },
        });
        setNotifications(response.data);
        // eslint-disable-next-line no-empty
      } catch {}
    }
  }, [loading, session]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  if (loading) {
    return (
      <div style={{ padding: '2rem', width: '250px', alignSelf: 'flex-end' }}>
        <Spinner height={56} count={1} circle />
      </div>
    );
  }

  function handleAvatarClick(): void {
    router.push('/perfil');
  }

  return (
    <header className={styles.container}>
      <Notification
        data={
          formattedNotifications ?? [
            { name: 'Sistema de notificações disponível em breve!' },
          ]
        }
      />
      <div
        style={{
          width: 0,
          height: 40,
          borderRight: '1px solid black',
        }}
      />
      <div className={styles.profileAnchor}>
        <Link href="/perfil">
          <a>{session?.user?.name ?? 'Tester'}</a>
        </Link>

        <p>Personal Trainer</p>
      </div>
      <Avatar
        src={session?.user?.image ?? ''}
        name={session?.user?.name ?? 'Tester'}
        title="Ver perfil"
        size="50"
        round="8px"
        color="#C4C4C4"
        className={styles.avatar}
        onClick={() => {
          handleAvatarClick();
        }}
      />
      <div
        style={{
          width: 0,
          height: 40,
          borderRight: '1px solid #fafafa',
        }}
      />
      <button
        style={{ border: 'none', background: 'none' }}
        type="button"
        onClick={() => {
          signOut();
        }}
      >
        <FiLogOut size={24} strokeWidth={2.5} color="#3f4254" />
      </button>
    </header>
  );
}
