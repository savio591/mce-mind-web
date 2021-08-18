import { closestIndexTo } from 'date-fns';
import { FaRegClock } from 'react-icons/fa';
import Spinner from 'react-loading-skeleton';

import { Card } from '../Card';
import styles from './Appointments.module.scss';

export type AppointmentsData = {
  id: number;
  name: string;
  date: string;
  image?: string;
  phone?: string;
}[];

export type AppointmentsProps =
  | {
      appointmentsData?: AppointmentsData;
      refDate?: string;
      isLoading?: boolean;
    }
  | {
      appointmentsData: AppointmentsData;
      refDate: string;
      isLoading: boolean;
    };

interface AppointmentsAcc {
  morning: AppointmentsData;
  afternoon: AppointmentsData;
  night: AppointmentsData;
}

export function Appointments({
  appointmentsData,
  refDate,
  isLoading,
}: AppointmentsProps): JSX.Element {
  if (
    appointmentsData === undefined ||
    appointmentsData === null ||
    appointmentsData.length <= 0 ||
    !refDate
  ) {
    return (
      <h1 className={styles.noAppointment}>
        Você não tem agendamentos disponíveis no momento.
      </h1>
    );
  }

  const nextAppointmentNameIndex = closestIndexTo(
    new Date(refDate),
    appointmentsData.map(item => new Date(item.date))
  );
  const nextAppointment = appointmentsData[nextAppointmentNameIndex];

  const appointments = appointmentsData.reduce(
    (acc, current) => {
      const hour = new Date(current.date).getHours();
      if (hour <= 12) {
        return {
          ...acc,
          morning: [...acc.morning, current],
        };
      }
      if (hour > 12 && hour <= 18) {
        return {
          ...acc,
          afternoon: [...acc.afternoon, current],
        };
      }
      if (hour > 18) {
        return {
          ...acc,
          night: [...acc.night, current],
        };
      }
      return { ...acc };
    },
    {
      morning: [],
      afternoon: [],
      night: [],
    } as AppointmentsAcc
  );

  return !isLoading ? (
    <div className={styles.appointments}>
      <div className={styles.nextAppointment}>
        <h2>Próximo agendamento:</h2>
        <Card
          name={nextAppointment.name}
          phone={nextAppointment.phone}
          date={new Date(nextAppointment.date)}
          image={nextAppointment.image}
        />
      </div>
      {appointments.morning.length !== -1 && (
        <div className={styles.section}>
          <h3>Manhã</h3>
          <ul className={styles.list}>
            {appointments.morning.map(appointment => (
              <li key={appointment.date.toString()}>
                <time>
                  <FaRegClock size={20} />
                  {new Intl.DateTimeFormat('pt-BR', {
                    timeStyle: 'short',
                  }).format(new Date(appointment.date))}
                </time>
                <Card
                  name={appointment.name}
                  image={appointment.image}
                  size="small"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {appointments.afternoon.length !== -1 && (
        <div className={styles.section}>
          <h3>Tarde</h3>
          <ul className={styles.list}>
            {appointments.afternoon.map(appointment => (
              <li key={appointment.date.toString()}>
                <time>
                  <FaRegClock size={20} />
                  {new Intl.DateTimeFormat('pt-BR', {
                    timeStyle: 'short',
                  }).format(new Date(appointment.date))}
                </time>
                <Card
                  name={appointment.name}
                  image={appointment.image}
                  size="small"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {appointments.night.length !== -1 && (
        <div className={styles.section}>
          <h3>Noite</h3>
          <ul className={styles.list}>
            {appointments.night.map(appointment => (
              <li key={appointment.date.toString()}>
                <time>
                  <FaRegClock size={20} />
                  {new Intl.DateTimeFormat('pt-BR', {
                    timeStyle: 'short',
                  }).format(new Date(appointment.date))}
                </time>
                <Card
                  name={appointment.name}
                  image={appointment.image}
                  size="small"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : (
    <Spinner height={56} count={8} circle />
  );
}
