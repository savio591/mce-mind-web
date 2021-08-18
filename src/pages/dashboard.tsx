import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { User } from 'next-auth';
import { getSession } from 'next-auth/client';

import { Notifications } from '../components/Notifications';

import styles from './Dashboard.module.scss';
import { SectionHeader } from '../components/SectionHeader';
import { Calendar, CalendarProps } from '../components/Calendar';
import { Appointments, AppointmentsData } from '../components/Appointments';

export interface DashboardProps {
  session: User;
  calendarData?: CalendarProps;
  appointmentsData: AppointmentsData;
  selectedDate: string;
  refDate?: string;
}

export default function Dashboard({
  session,
  selectedDate,
  refDate,
  calendarData,
  appointmentsData,
}: DashboardProps): JSX.Element {
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
              title="Dashboard"
              date={selectedDate}
              refDate={refDate ?? new Date().toISOString()}
              anchor={{
                name: 'Editar disponibilidade',
                link: './status',
              }}
            />
            <Appointments
              appointmentsData={appointmentsData}
              refDate={refDate}
            />
          </article>
          <aside>
            <Calendar {...calendarData} />
          </aside>
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
