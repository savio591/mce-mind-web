import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';
import Head from 'next/head';

import styles from './Dashboard.module.scss';
import { SectionHeader } from '../../components/SectionHeader';
import { Calendar, CalendarProps } from '../../components/Calendar';
import { Appointments, AppointmentsData } from '../../components/Appointments';
import { Header } from '../../components/Header';
import { api } from '../../services/api';

export interface DashboardProps {
  calendarData?: CalendarProps;
  selectedDate: string;
  refDate?: string;
}

type CalendarData = string[];

type Session = [session: { secret: string }, loading: boolean];

export default function Dashboard({
  selectedDate,
  refDate,
}: DashboardProps): JSX.Element {
  const router = useRouter();
  const [session, loading] = useSession() as Session;
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentsData, setAppointmentsData] = useState<AppointmentsData>(
    [] as AppointmentsData
  );
  const [calendarData, setCalendarData] = useState<CalendarData>(
    [] as CalendarData
  );

  const fetchAppointments = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (!loading) {
        const { data } = await api.get(
          `/provider/appointments${
            selectedDate ? `?date=${selectedDate}` : ''
          }`,
          {
            headers: { Authorization: `Bearer ${session.secret}` },
          }
        );
        setAppointmentsData(data.appointmentsData);
        setCalendarData(data.calendarData);
        setIsLoading(false);
      } else return;
    } catch {
      toast.error('Erro ao obter agendamentos!');
      setIsLoading(false);
    }
  }, [loading, session?.secret, selectedDate]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  async function handleSelectDateFromCalendar(date?: string): Promise<void> {
    if (date && session?.secret) {
      router.push({ query: { date } });
    }
  }

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
          <>
            <article>
              <SectionHeader
                title="Dashboard"
                date={selectedDate}
                refDate={refDate}
                anchor={{
                  name: 'Editar disponibilidade',
                  link: '/dashboard/status',
                }}
              />
              <Appointments
                appointmentsData={appointmentsData}
                isLoading={isLoading}
                refDate={refDate}
              />
            </article>
            <aside>
              <Calendar
                {...{ selectedDate, refDate, availableDays: calendarData }}
                onSelectDate={date => {
                  handleSelectDateFromCalendar(date);
                }}
              />
            </aside>
          </>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async req => {
  const { date } = req.query;

  const now = new Date().toISOString();
  const selectedDate = date ?? now;

  return {
    props: {
      refDate: now,
      selectedDate,
    },
  };
};
