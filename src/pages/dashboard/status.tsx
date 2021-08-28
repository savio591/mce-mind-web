import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { User } from 'next-auth';
import { toast } from 'react-toastify';
import Spinner from 'react-loading-skeleton';

import styles from './Dashboard.module.scss';
import { SectionHeader } from '../../components/SectionHeader';
import {
  SetAvailableWeeklyHour,
  WeekDay,
  WeeksData,
} from '../../components/SetAvailableWeeklyHour';
import { Header } from '../../components/Header';
import { api } from '../../services/api';
import { WeekDayData } from '../../components/WeekDayPick';

type Session = [session: { secret: string }, loading: boolean];
export interface ProviderStatusProps {
  session: User;
  weeksData: WeeksData;
}

interface ProviderStatusGetRequest {
  id: string;
  providerId: string;
  name: string;
  email: string;
  phone: string;
  isAvailable: boolean;
  weeks: WeeksData;
  startDate: string;
  pauseStartDate: string;
  pauseEndDate: string;
  endDate: string;
}

export default function ProviderStatus(): JSX.Element {
  const [session, loading] = useSession() as Session;
  const [weeksData, setWeeksData] = useState<WeeksData>([] as WeeksData);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState<boolean | undefined>(
    undefined
  );
  const allLoading = loading ?? isLoading;

  const fetchAvailableData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (!loading) {
        const { data } = await api.get<ProviderStatusGetRequest>(
          '/provider/set',
          {
            headers: { Authorization: `Bearer ${session.secret}` },
          }
        );
        setWeeksData(data.weeks);
        setIsAvailable(data.isAvailable);
        setIsLoading(false);
      } else return;
    } catch {
      toast.error('Erro ao verificar dados!');
      setIsLoading(false);
    }
  }, [loading, session?.secret]);

  useEffect(() => {
    fetchAvailableData();
  }, [fetchAvailableData]);

  async function handleAvailableData(
    week: WeekDay,
    data: WeekDayData
  ): Promise<void> {
    try {
      const newData = weeksData.map(item => {
        if (week === item.weekDay) {
          return { ...item, weekData: data };
        }
        return item;
      });
      await api.post<ProviderStatusGetRequest>(
        '/provider/set',
        { weeks: newData },
        {
          headers: { Authorization: `Bearer ${session?.secret}` },
        }
      );
    } catch {
      toast.error('Erro ao editar dsisponibilidade!');
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
          <article>
            <SectionHeader
              title="Editar Disponibilidade"
              anchor={{
                name: 'Voltar para Dashboard',
                link: '/dashboard',
              }}
            />
            <pre>{isAvailable ? 'Disponível' : 'Não Disponível'}</pre>
            {allLoading ? (
              <Spinner height={56} count={8} circle />
            ) : (
              <SetAvailableWeeklyHour
                serverWeeksData={weeksData}
                setRequestWeekData={handleAvailableData}
              />
            )}
          </article>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { status: 200, refDate: new Date().toISOString() },
  };
};
