import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Spinner from 'react-loading-skeleton';
import Avatar from 'react-avatar';

import { Notification } from '../Notification';
import styles from './Header.module.scss';

type Session = [
  session: { user?: { email: string; name: string; image?: string | null } },
  loading: boolean
];

export interface HeaderProps {
  // eslint-disable-next-line react/no-unused-prop-types
  session?: Session[0];
}

// eslint-disable-next-line no-empty-pattern
export function Header({}: HeaderProps): JSX.Element {
  const [session, loading] = useSession();
  const router = useRouter();

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
      <Notification data={[{ name: 'Ai' }, { name: 'Dentro' }]} />
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
    </header>
  );
}
