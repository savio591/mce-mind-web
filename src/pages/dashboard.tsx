import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';

import styles from './Dashboard.module.scss';
import { SectionHeader } from '../components/SectionHeader';
import { Calendar, CalendarProps } from '../components/Calendar';
import { Appointments, AppointmentsData } from '../components/Appointments';
import { Header } from '../components/Header';

export interface DashboardProps {
  calendarData?: CalendarProps;
  appointmentsData: AppointmentsData;
  selectedDate: string;
  refDate?: string;
}

export default function Dashboard({
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
        <Header />
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
    props: { status: 200 },
  };
};
