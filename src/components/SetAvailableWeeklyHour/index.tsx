import { useEffect, useState } from 'react';
import styles from './SetAvailableWeeklyHour.module.scss';
import { WeekDayData as WeekDataCallback, WeekDayPick } from '../WeekDayPick';

type WeekDay =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

interface WeekData {
  isAvailable: boolean;
}

export type WeeksData = {
  weekDay: WeekDay;
  weekData: WeekData;
}[];

export interface SetAvailableWeeklyHourProps {
  serverWeeksData: WeeksData;
  setRequestWeekData?: (weekDay: WeekDay, data: WeekDataCallback) => void;
}

export function SetAvailableWeeklyHour({
  serverWeeksData,
  setRequestWeekData,
}: SetAvailableWeeklyHourProps): JSX.Element {
  const [weeksData, setWeeksData] = useState<WeeksData>([] as WeeksData);

  useEffect(() => {
    setWeeksData(serverWeeksData);
  }, [serverWeeksData]);

  function handleWeekData(weekDay: WeekDay, data: WeekDataCallback): void {
    if (setRequestWeekData) {
      setRequestWeekData(weekDay, data);
    }
  }

  return (
    <ul className={styles.container}>
      {weeksData?.map(week => {
        return (
          <WeekDayPick
            {...week}
            setWeekData={handleWeekData}
            key={week.weekDay}
          />
        );
      }) ?? (
        <p style={{ marginTop: '2rem' }}>
          Não foi possível mostrar a disponibilidade
        </p>
      )}
    </ul>
  );
}
