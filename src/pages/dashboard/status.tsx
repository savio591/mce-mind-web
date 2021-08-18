import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { User } from 'next-auth';
import { getSession } from 'next-auth/client';

import { Notifications } from '../../components/Notifications';

import styles from '../Dashboard.module.scss';
import { SectionHeader } from '../../components/SectionHeader';
import {
  SetAvailableWeeklyHour,
  WeeksData,
} from '../../components/SetAvailableWeeklyHour';

export interface ProviderStatusProps {
  session: User;
  weeksData: WeeksData;
}

export default function ProviderStatus({
  session,
  weeksData,
}: ProviderStatusProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Dashboard | MCE</title>
        <meta name="description" content="Projeto MCE" />
        <link rel="image/png" href="/favicon.png" />
      </Head>
      <main className={styles.container}>
        <header>
          <Notifications
            quantity={2}
            notificationsData={[]}
            align="right"
            imageSrc={session?.image ?? ''}
            name={session.name ?? ''}
            onBlur={() => null}
            onClick={() => null}
            showNotifications={false}
            title="Notificações"
          />
        </header>
        <div className={styles.section}>
          <article>
            <SectionHeader
              title="Editar Disponibilidade"
              anchor={{
                name: 'Voltar para Dashboard',
                link: '../',
              }}
            />
            <SetAvailableWeeklyHour serverWeeksData={weeksData} />
          </article>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async req => {
  const session = await getSession(req);
  if (!session?.user) {
    return {
      redirect: {
        destination: `/`,
      },
      props: { message: 'Redirecionando para o Login' },
    };
  }
  return {
    props: { status: 200, session: session.user },
  };
};
